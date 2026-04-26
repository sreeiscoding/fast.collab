"use client";

import { SelectDrawer } from "../ui/SelectDrawer";

const categories = ["Intro", "Body", "Outro"];

export function CategorySelect({ value, onChange }) {
  return (
    <div className="rounded-2xl border border-zinc-200/60 bg-white p-6 shadow-sm dark:border-zinc-800/60 dark:bg-zinc-900/30">
      <div className="block">
        <div className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
          Category
        </div>
        <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
          Choose where these files belong.
        </div>
        <div className="mt-4">
          <SelectDrawer
            value={value}
            onChange={onChange}
            options={categories.map((c) => ({
              value: c,
              label: c,
            }))}
          />
        </div>
      </div>
    </div>
  );
}

