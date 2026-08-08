/**
 * Generic administration data table.
 */

import AdminEmptyState from "../AdminEmptyState";

import { classNames } from "@/utils";

import styles from "./AdminDataTable.module.scss";

const DEFAULT_SKELETON_ROWS = 5;

export default function AdminDataTable({
    columns = [],
    data = [],
    rowKey = "id",
    loading = false,
    skeletonRows = DEFAULT_SKELETON_ROWS,
    emptyIcon,
    emptyTitle = "Aucune donnée",
    emptyDescription = "Aucun élément à afficher pour le moment.",
    emptyAction,
    className,
}) {
    const getRowKey = (row, index) => {
        if (typeof rowKey === "function") {
        return rowKey(row, index);
        }

        return row?.[rowKey] ?? index;
    };

    const getCellContent = (column, row) => {
        if (typeof column.render === "function") {
        return column.render(row);
        }

        return row?.[column.key] ?? "—";
    };

    return (
        <section
        className={classNames(
            styles.wrapper,
            className
        )}
        >
            <div className={styles.scrollContainer}>
                <table className={styles.table}>
                <thead>
                    <tr>
                    {columns.map((column) => (
                        <th
                        key={column.key}
                        scope="col"
                        className={classNames(
                            styles.headerCell,
                            column.align === "center" &&
                            styles.alignCenter,
                            column.align === "right" &&
                            styles.alignRight
                        )}
                        style={
                            column.width
                            ? {
                                width: column.width,
                                }
                            : undefined
                        }
                        >
                        {column.label}
                        </th>
                    ))}
                    </tr>
                </thead>

                <tbody>
                    {loading
                    ? Array.from({
                        length: skeletonRows,
                        }).map((_, rowIndex) => (
                        <tr
                            key={`skeleton-${rowIndex}`}
                            className={styles.row}
                            aria-hidden="true"
                        >
                            {columns.map((column) => (
                            <td
                                key={column.key}
                                className={styles.cell}
                            >
                                <span
                                className={
                                    styles.skeleton
                                }
                                />
                            </td>
                            ))}
                        </tr>
                        ))
                    : data.map((row, rowIndex) => (
                        <tr
                            key={getRowKey(
                            row,
                            rowIndex
                            )}
                            className={styles.row}
                        >
                            {columns.map((column) => (
                            <td
                                key={column.key}
                                className={classNames(
                                styles.cell,
                                column.align ===
                                    "center" &&
                                    styles.alignCenter,
                                column.align ===
                                    "right" &&
                                    styles.alignRight
                                )}
                            >
                                {getCellContent(
                                column,
                                row
                                )}
                            </td>
                            ))}
                        </tr>
                        ))}
                </tbody>
                </table>
            </div>

            {!loading && data.length === 0 ? (
            <AdminEmptyState
                icon={emptyIcon}
                title={emptyTitle}
                description={emptyDescription}
                action={emptyAction}
                compact
            />
            ) : null}
        </section>
    );
}