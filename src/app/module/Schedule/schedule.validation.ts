//

import { z } from "zod";

/**
 * Request shape:
 * {
 *   body: {
 *     startDate: "2025-11-01", // YYYY-MM-DD
 *     endDate:   "2025-11-03", // YYYY-MM-DD
 *     startTime: "09:00",      // HH:MM (24h)
 *     endTime:   "17:00"       // HH:MM (24h)
 *   }
 * }
 */

//w: (start)╭──────────── createSchedule  ────────────╮
const createSchedule = z.object({
  body: z
    .object({
      startDate: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "startDate must be in YYYY-MM-DD"),
      endDate: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "endDate must be in YYYY-MM-DD"),
      startTime: z
        .string()
        .regex(
          /^([01]\d|2[0-3]):[0-5]\d$/,
          "startTime must be HH:MM (24-hour)",
        ),
      endTime: z
        .string()
        .regex(/^([01]\d|2[0-3]):[0-5]\d$/, "endTime must be HH:MM (24-hour)"),
    })
    // check date order
    .refine(
      (d) => {
        const s = new Date(d.startDate);
        const e = new Date(d.endDate);
        return s.getTime() <= e.getTime();
      },
      {
        message: "startDate must be on or before endDate",
        path: ["startDate"],
      },
    )
    // check time order for a day (ensures at least one slot per day makes sense)
    .refine(
      (d) => {
        // compare times on the startDate (local)
        const base = d.startDate;
        const s = new Date(`${base}T${d.startTime}:00`);
        const e = new Date(`${base}T${d.endTime}:00`);
        return s.getTime() < e.getTime();
      },
      { message: "startTime must be before endTime", path: ["startTime"] },
    ),
});

export type TSchedule = z.infer<typeof createSchedule>["body"];

//w: (end) ╰──────────── createSchedule ────────────╯

export const ScheduleValidation = {
  createSchedule,
};
