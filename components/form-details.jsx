"use client";

import { Badge } from "@/components/ui/badge";

/**
 * Renders a submission's form_data as grouped, human-readable detail sections.
 * Shared by the user dashboard and admin submission modals.
 *
 * - Simple fields → responsive label/value definition grid
 * - Arrays of objects (e.g. Members) → one card per item
 * - Arrays of primitives → chips
 * - Nested objects → their own titled section
 * - Empty fields are hidden — they add noise, not information
 */

const formatFieldLabel = (key) =>
  key.replace(/_/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2");

const isEmptyValue = (value) =>
  value === null ||
  value === undefined ||
  (typeof value === "string" && value.trim() === "") ||
  (Array.isArray(value) && value.length === 0) ||
  (typeof value === "object" &&
    !Array.isArray(value) &&
    Object.keys(value).length === 0);

const renderScalarValue = (value) => {
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (typeof value === "string" && value.startsWith("http")) {
    return (
      <a
        href={value}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline hover:text-blue-800 break-all"
      >
        {value.split("/").pop()}
      </a>
    );
  }
  return String(value);
};

// Label + value pairs laid out in a responsive definition grid
const FieldGrid = ({ entries }) => (
  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
    {entries.map(([key, value]) => (
      <div key={key} className="min-w-0">
        <dt className="text-xs font-medium uppercase tracking-wide text-gray-500 capitalize">
          {formatFieldLabel(key)}
        </dt>
        <dd className="mt-0.5 text-sm font-medium text-gray-900 break-words">
          {renderScalarValue(value)}
        </dd>
      </div>
    ))}
  </dl>
);

export function FormDetails({ data }) {
  // Tolerate form_data stored as a JSON string
  let formData = data;
  if (typeof formData === "string") {
    try {
      formData = JSON.parse(formData);
    } catch (_) {
      // leave as is if not valid JSON
    }
  }

  if (!formData || typeof formData !== "object") {
    return <p className="text-gray-500 text-sm">No detailed data available.</p>;
  }

  const entries = Object.entries(formData).filter(
    ([, value]) => !isEmptyValue(value)
  );

  if (entries.length === 0) {
    return <p className="text-gray-500 text-sm">No detailed data available.</p>;
  }

  const simpleEntries = entries.filter(
    ([, value]) => typeof value !== "object"
  );
  const complexEntries = entries.filter(
    ([, value]) => typeof value === "object" && value !== null
  );

  return (
    <div className="space-y-6">
      {simpleEntries.length > 0 && (
        <div className="rounded-lg border border-gray-200 bg-gray-50/60 p-4 sm:p-5">
          <FieldGrid entries={simpleEntries} />
        </div>
      )}

      {complexEntries.map(([key, value]) => {
        const sectionLabel = formatFieldLabel(key);

        // Array of primitives → chips
        if (
          Array.isArray(value) &&
          value.every((v) => typeof v !== "object" || v === null)
        ) {
          return (
            <div key={key} className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-900 capitalize">
                {sectionLabel}
              </h4>
              <div className="flex flex-wrap gap-2">
                {value.map((v, idx) => (
                  <Badge
                    key={idx}
                    className="bg-gray-100 text-gray-700 border border-gray-200 font-normal"
                  >
                    {String(v)}
                  </Badge>
                ))}
              </div>
            </div>
          );
        }

        // Array of objects (e.g., Members) → one card per item
        if (Array.isArray(value)) {
          const itemLabel = sectionLabel.replace(/s$/i, "");
          return (
            <div key={key} className="space-y-2">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-semibold text-gray-900 capitalize">
                  {sectionLabel}
                </h4>
                <Badge className="bg-orange-50 text-orange-700 border border-orange-200 font-medium">
                  {value.length}
                </Badge>
              </div>
              <div className="space-y-3">
                {value.map((item, idx) => {
                  const itemEntries =
                    item && typeof item === "object"
                      ? Object.entries(item).filter(
                          ([, v]) => !isEmptyValue(v) && typeof v !== "object"
                        )
                      : [];
                  return (
                    <div
                      key={idx}
                      className="rounded-lg border border-gray-200 p-4"
                    >
                      {value.length > 1 && (
                        <p className="text-xs font-semibold text-orange-600 uppercase tracking-wide mb-3 capitalize">
                          {itemLabel} {idx + 1}
                        </p>
                      )}
                      {itemEntries.length > 0 ? (
                        <FieldGrid entries={itemEntries} />
                      ) : (
                        <p className="text-sm text-gray-500">
                          No details provided.
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        }

        // Plain nested object → its own definition grid
        const nestedEntries = Object.entries(value).filter(
          ([, v]) => !isEmptyValue(v) && typeof v !== "object"
        );
        return (
          <div key={key} className="space-y-2">
            <h4 className="text-sm font-semibold text-gray-900 capitalize">
              {sectionLabel}
            </h4>
            <div className="rounded-lg border border-gray-200 p-4">
              {nestedEntries.length > 0 ? (
                <FieldGrid entries={nestedEntries} />
              ) : (
                <pre className="text-xs bg-gray-50 rounded p-2 overflow-x-auto">
                  {JSON.stringify(value, null, 2)}
                </pre>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
