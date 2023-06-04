import {
  ArrowRight,
  BookOpen,
  CalendarClock,
  Command,
  FileText,
  ScrollText,
  type Icon as LucideIcon,
} from 'lucide-react'

export type Icon = LucideIcon

export const Icons = {
  logo: Command,
  monographs: BookOpen,
  events: CalendarClock,
  degreePrograms: ScrollText,
  documents: FileText,
  arrowRight: ArrowRight,
}
