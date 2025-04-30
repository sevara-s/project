import { format, isValid } from "date-fns"

export const safeFormatDate = (dateString: string | Date, formatString: string) => {
  if (!dateString) return "-"
  const date = new Date(dateString)
  return isValid(date) ? format(date, formatString) : "-"
}