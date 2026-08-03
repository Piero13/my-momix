/**
 * Generates and downloads a printable recipe PDF.
 */

import { jsPDF } from "jspdf";

import {
  formatQuantity,
  getTipLabels,
  scaleQuantity,
} from "@/utils";

/* ==========================================================================
   PDF configuration
   ========================================================================== */

const PDF_CONFIG = {
  margin: 16,
  topMargin: 18,
  bottomMargin: 16,

  titleSize: 22,
  sectionTitleSize: 15,
  bodySize: 10,
  smallSize: 8.5,

  lineHeight: 5,
  paragraphSpacing: 4,
  sectionSpacing: 8,

  primaryColor: [76, 175, 80],
  secondaryColor: [255, 152, 0],
  textColor: [51, 51, 51],
  mutedColor: [102, 102, 102],
  borderColor: [221, 221, 221],
};

/* ==========================================================================
   Internal helpers
   ========================================================================== */

/**
 * Creates a safe file name.
 *
 * @param {string} value
 * @returns {string}
 */
function createSafeFilename(value) {
  const normalizedValue = String(value ?? "recette")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return normalizedValue || "recette";
}

/**
 * Formats a duration in minutes.
 *
 * @param {number|null|undefined} value
 * @returns {string}
 */
function formatDuration(value) {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue) || numericValue <= 0) {
    return "—";
  }

  if (numericValue < 60) {
    return `${numericValue} min`;
  }

  const hours = Math.floor(numericValue / 60);
  const minutes = numericValue % 60;

  if (minutes === 0) {
    return `${hours} h`;
  }

  return `${hours} h ${minutes} min`;
}

/**
 * Returns a readable ingredient line using scaled quantities.
 *
 * @param {object} ingredient
 * @param {number} originalServings
 * @param {number} selectedServings
 * @returns {string}
 */
function formatIngredientLine(
  ingredient,
  originalServings,
  selectedServings
) {
  const scaledQuantity = scaleQuantity(
    ingredient.quantity,
    originalServings,
    selectedServings
  );

  const quantity = formatQuantity(scaledQuantity);

  const amount = [quantity, ingredient.unit]
    .filter(Boolean)
    .join(" ");

  return amount
    ? `${amount} ${ingredient.name}`
    : ingredient.name;
}

/**
 * Returns formatted metadata for a preparation step.
 *
 * @param {object} step
 * @returns {string[]}
 */
function getStepMetadata(step) {
  const metadata = [];

  if (step.duration !== null && step.duration !== undefined) {
    metadata.push(`Durée : ${step.duration} min`);
  }

  if (
    step.temperature !== null &&
    step.temperature !== undefined
  ) {
    metadata.push(`Température : ${step.temperature} °C`);
  }

  if (step.speed !== null && step.speed !== undefined) {
    metadata.push(`Vitesse : ${step.speed}`);
  }

  return metadata;
}

/* ==========================================================================
   PDF writer
   ========================================================================== */

function createPdfWriter(doc) {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  const contentWidth =
    pageWidth - PDF_CONFIG.margin * 2;

  let cursorY = PDF_CONFIG.topMargin;

  function applyBodyStyle() {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(PDF_CONFIG.bodySize);
    doc.setTextColor(...PDF_CONFIG.textColor);
  }

  function addFooter() {
    const pageNumber = doc.getNumberOfPages();

    doc.setDrawColor(...PDF_CONFIG.borderColor);
    doc.line(
      PDF_CONFIG.margin,
      pageHeight - 11,
      pageWidth - PDF_CONFIG.margin,
      pageHeight - 11
    );

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(...PDF_CONFIG.mutedColor);

    doc.text(
      "MyMomix — Recette générée depuis l’application",
      PDF_CONFIG.margin,
      pageHeight - 6
    );

    doc.text(
      String(pageNumber),
      pageWidth - PDF_CONFIG.margin,
      pageHeight - 6,
      {
        align: "right",
      }
    );
  }

  function addPage() {
    addFooter();
    doc.addPage();

    cursorY = PDF_CONFIG.topMargin;
    applyBodyStyle();
  }

  function ensureSpace(requiredHeight) {
    const availableBottom =
      pageHeight - PDF_CONFIG.bottomMargin - 10;

    if (cursorY + requiredHeight > availableBottom) {
      addPage();
    }
  }

  function addVerticalSpace(space) {
    cursorY += space;
  }

  function addLine({
    color = PDF_CONFIG.borderColor,
    spacingBefore = 0,
    spacingAfter = PDF_CONFIG.sectionSpacing,
  } = {}) {
    cursorY += spacingBefore;

    ensureSpace(spacingAfter + 1);

    doc.setDrawColor(...color);
    doc.line(
      PDF_CONFIG.margin,
      cursorY,
      pageWidth - PDF_CONFIG.margin,
      cursorY
    );

    cursorY += spacingAfter;
  }

  function addText(
    text,
    {
      x = PDF_CONFIG.margin,
      size = PDF_CONFIG.bodySize,
      style = "normal",
      color = PDF_CONFIG.textColor,
      maxWidth = contentWidth,
      lineHeight = PDF_CONFIG.lineHeight,
      spacingAfter = PDF_CONFIG.paragraphSpacing,
      align = "left",
    } = {}
  ) {
    if (text === null || text === undefined || text === "") {
      return;
    }

    doc.setFont("helvetica", style);
    doc.setFontSize(size);
    doc.setTextColor(...color);

    const lines = doc.splitTextToSize(
      String(text),
      maxWidth
    );

    const blockHeight = lines.length * lineHeight;

    ensureSpace(blockHeight + spacingAfter);

    doc.text(lines, x, cursorY, {
      baseline: "top",
      align,
    });

    cursorY += blockHeight + spacingAfter;
  }

  function addSectionTitle(title) {
    ensureSpace(12);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(PDF_CONFIG.sectionTitleSize);
    doc.setTextColor(...PDF_CONFIG.primaryColor);

    doc.text(
      String(title).toUpperCase(),
      PDF_CONFIG.margin,
      cursorY,
      {
        baseline: "top",
      }
    );

    cursorY += 7;

    doc.setDrawColor(...PDF_CONFIG.primaryColor);
    doc.setLineWidth(0.7);
    doc.line(
      PDF_CONFIG.margin,
      cursorY,
      PDF_CONFIG.margin + 24,
      cursorY
    );

    doc.setLineWidth(0.2);

    cursorY += PDF_CONFIG.sectionSpacing;
  }

  function addBullet(text) {
    const bulletIndent = 5;
    const textX = PDF_CONFIG.margin + bulletIndent;
    const maxWidth = contentWidth - bulletIndent;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(PDF_CONFIG.bodySize);
    doc.setTextColor(...PDF_CONFIG.textColor);

    const lines = doc.splitTextToSize(
      String(text),
      maxWidth
    );

    const blockHeight =
      lines.length * PDF_CONFIG.lineHeight;

    ensureSpace(
      blockHeight + PDF_CONFIG.paragraphSpacing
    );

    doc.setFillColor(...PDF_CONFIG.primaryColor);
    doc.circle(
      PDF_CONFIG.margin + 1.5,
      cursorY + 2,
      0.8,
      "F"
    );

    doc.text(lines, textX, cursorY, {
      baseline: "top",
    });

    cursorY +=
      blockHeight + PDF_CONFIG.paragraphSpacing;
  }

  function addNumberedBlock(number, text, metadata = []) {
    const numberColumnWidth = 10;
    const textX = PDF_CONFIG.margin + numberColumnWidth;
    const textWidth = contentWidth - numberColumnWidth;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(PDF_CONFIG.bodySize);

    const descriptionLines = doc.splitTextToSize(
      String(text),
      textWidth
    );

    let metadataLines = [];

    if (metadata.length > 0) {
      metadataLines = doc.splitTextToSize(
        metadata.join("   •   "),
        textWidth
      );
    }

    const descriptionHeight =
      descriptionLines.length * PDF_CONFIG.lineHeight;

    const metadataHeight =
      metadataLines.length > 0
        ? metadataLines.length * 4 + 3
        : 0;

    const blockHeight =
      Math.max(8, descriptionHeight + metadataHeight) +
      PDF_CONFIG.paragraphSpacing;

    ensureSpace(blockHeight);

    doc.setFillColor(...PDF_CONFIG.primaryColor);
    doc.circle(
      PDF_CONFIG.margin + 3,
      cursorY + 3,
      3,
      "F"
    );

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(255, 255, 255);

    doc.text(
      String(number),
      PDF_CONFIG.margin + 3,
      cursorY + 3,
      {
        align: "center",
        baseline: "middle",
      }
    );

    doc.setFont("helvetica", "normal");
    doc.setFontSize(PDF_CONFIG.bodySize);
    doc.setTextColor(...PDF_CONFIG.textColor);

    doc.text(
      descriptionLines,
      textX,
      cursorY,
      {
        baseline: "top",
      }
    );

    cursorY += descriptionHeight;

    if (metadataLines.length > 0) {
      cursorY += 2;

      doc.setFontSize(PDF_CONFIG.smallSize);
      doc.setTextColor(...PDF_CONFIG.mutedColor);

      doc.text(
        metadataLines,
        textX,
        cursorY,
        {
          baseline: "top",
        }
      );

      cursorY += metadataLines.length * 4;
    }

    cursorY += PDF_CONFIG.paragraphSpacing;
  }

  function finish() {
    addFooter();
  }

  return {
    pageWidth,
    pageHeight,
    contentWidth,
    getCursorY: () => cursorY,
    setCursorY: (value) => {
      cursorY = value;
    },
    ensureSpace,
    addVerticalSpace,
    addLine,
    addText,
    addSectionTitle,
    addBullet,
    addNumberedBlock,
    finish,
  };
}

/* ==========================================================================
   Public service
   ========================================================================== */

/**
 * Generates and downloads a recipe PDF.
 *
 * @param {object} params
 * @param {object} params.recipe
 * @param {number} params.selectedServings
 * @returns {void}
 */
export function generateRecipePdf({
  recipe,
  selectedServings = recipe?.servings,
}) {
  if (!recipe) {
    throw new Error(
      "A recipe is required to generate the PDF."
    );
  }

  const servings =
    Number.isFinite(Number(selectedServings)) &&
    Number(selectedServings) > 0
      ? Number(selectedServings)
      : Number(recipe.servings) || 1;

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
    compress: true,
  });

  const writer = createPdfWriter(doc);

  doc.setProperties({
    title: recipe.title,
    subject: `Recette MyMomix : ${recipe.title}`,
    author: "MyMomix",
    creator: "MyMomix",
  });

  /* ==========================================================================
     Document header
     ========================================================================== */

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(...PDF_CONFIG.primaryColor);

  doc.text(
    "MyMomix",
    PDF_CONFIG.margin,
    writer.getCursorY(),
    {
      baseline: "top",
    }
  );

  writer.addVerticalSpace(8);

  writer.addText(recipe.title, {
    size: PDF_CONFIG.titleSize,
    style: "bold",
    spacingAfter: 5,
  });

  if (recipe.description) {
    writer.addText(recipe.description, {
      size: 11,
      color: PDF_CONFIG.mutedColor,
      lineHeight: 5.5,
      spacingAfter: 6,
    });
  }

  const categoryName =
    typeof recipe.category === "object"
      ? recipe.category?.name
      : recipe.category;

  const summaryItems = [
    categoryName
      ? `Catégorie : ${categoryName}`
      : null,
    recipe.difficulty
      ? `Difficulté : ${recipe.difficulty}`
      : null,
    `Portions : ${servings}`,
    recipe.preparationTime
      ? `Préparation : ${formatDuration(
          recipe.preparationTime
        )}`
      : null,
    recipe.cookingTime
      ? `Cuisson : ${formatDuration(
          recipe.cookingTime
        )}`
      : null,
    recipe.totalTime
      ? `Total : ${formatDuration(recipe.totalTime)}`
      : null,
  ].filter(Boolean);

  writer.addText(summaryItems.join("   •   "), {
    size: PDF_CONFIG.smallSize,
    style: "bold",
    color: PDF_CONFIG.textColor,
    lineHeight: 4.5,
    spacingAfter: 5,
  });

  if (
    typeof recipe.averageRating === "number" &&
    recipe.averageRating > 0
  ) {
    const ratingText = [
      `Note : ${recipe.averageRating.toFixed(1)} / 5`,
      typeof recipe.ratingsCount === "number"
        ? `${recipe.ratingsCount} avis`
        : null,
    ]
      .filter(Boolean)
      .join(" — ");

    writer.addText(ratingText, {
      size: PDF_CONFIG.smallSize,
      color: PDF_CONFIG.secondaryColor,
      spacingAfter: 4,
    });
  }

  writer.addLine();

  /* ==========================================================================
     Ingredients
     ========================================================================== */

  writer.addSectionTitle(
    `Ingrédients — ${servings} ${
      servings > 1 ? "personnes" : "personne"
    }`
  );

  if (
    Array.isArray(recipe.ingredients) &&
    recipe.ingredients.length > 0
  ) {
    recipe.ingredients.forEach((ingredient) => {
      writer.addBullet(
        formatIngredientLine(
          ingredient,
          recipe.servings,
          servings
        )
      );
    });
  } else {
    writer.addText("Aucun ingrédient renseigné.", {
      color: PDF_CONFIG.mutedColor,
    });
  }

  writer.addVerticalSpace(
    PDF_CONFIG.sectionSpacing
  );

  /* ==========================================================================
     Preparation steps
     ========================================================================== */

  writer.addSectionTitle("Préparation");

  if (
    Array.isArray(recipe.steps) &&
    recipe.steps.length > 0
  ) {
    const sortedSteps = [...recipe.steps].sort(
      (firstStep, secondStep) =>
        firstStep.order - secondStep.order
    );

    sortedSteps.forEach((step, index) => {
      writer.addNumberedBlock(
        step.order ?? index + 1,
        step.description,
        getStepMetadata(step)
      );
    });
  } else {
    writer.addText(
      "Aucune étape de préparation renseignée.",
      {
        color: PDF_CONFIG.mutedColor,
      }
    );
  }

  /* ==========================================================================
     Tips
     ========================================================================== */

  if (
    Array.isArray(recipe.tips) &&
    recipe.tips.length > 0
  ) {
    writer.addVerticalSpace(
      PDF_CONFIG.sectionSpacing
    );

    writer.addSectionTitle(
      "Astuces et variantes"
    );

    const formattedTips = getTipLabels(recipe.tips);

    formattedTips.forEach((tip) => {
      writer.addBullet(
        `${tip.displayLabel} — ${tip.text}`
      );
    });
  }

  /* ==========================================================================
     Nutrition
     ========================================================================== */

  if (recipe.nutrition) {
    const nutritionItems = [
      {
        label: "Énergie",
        value: recipe.nutrition.calories,
        unit: "kcal",
      },
      {
        label: "Protéines",
        value: recipe.nutrition.proteins,
        unit: "g",
      },
      {
        label: "Glucides",
        value: recipe.nutrition.carbohydrates,
        unit: "g",
      },
      {
        label: "Lipides",
        value: recipe.nutrition.fats,
        unit: "g",
      },
      {
        label: "Fibres",
        value: recipe.nutrition.fiber,
        unit: "g",
      },
    ].filter(
      ({ value }) =>
        value !== null &&
        value !== undefined &&
        value !== ""
    );

    if (nutritionItems.length > 0) {
      writer.addVerticalSpace(
        PDF_CONFIG.sectionSpacing
      );

      writer.addSectionTitle(
        "Valeurs nutritionnelles"
      );

      writer.addText(
        "Valeurs moyennes pour une portion.",
        {
          size: PDF_CONFIG.smallSize,
          color: PDF_CONFIG.mutedColor,
          spacingAfter: 4,
        }
      );

      const nutritionText = nutritionItems
        .map(({ label, value, unit }) => {
          const formattedValue =
            new Intl.NumberFormat("fr-FR", {
              maximumFractionDigits: 1,
            }).format(Number(value));

          return `${label} : ${formattedValue} ${unit}`;
        })
        .join("   •   ");

      writer.addText(nutritionText, {
        style: "bold",
        lineHeight: 5,
        spacingAfter: 4,
      });

      writer.addText(
        "Ces informations sont données à titre indicatif et peuvent varier selon les ingrédients et les marques utilisés.",
        {
          size: 7.5,
          color: PDF_CONFIG.mutedColor,
          lineHeight: 4,
          spacingAfter: 2,
        }
      );
    }
  }

  /* ==========================================================================
     Download
     ========================================================================== */

  writer.finish();

  const filename = `${createSafeFilename(
    recipe.title
  )}-mymomix.pdf`;

  doc.save(filename);
}