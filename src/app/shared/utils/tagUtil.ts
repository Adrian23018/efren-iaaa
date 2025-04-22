export type Severity = "success" | "secondary" | "info" | "warn" | "danger" | "contrast" | undefined;

export class TagUtil {
  private static readonly severityMap: Record<string, Severity> = {
    'ansiedad': 'danger',
    'estrés laboral': 'warn',
    'insomnio': 'info',
    'duelo': 'danger',
    'procesando pérdida': 'danger',
    'reflexión': 'info',
    'indecisión': 'warn',
    'transición vital': 'info',
    'miedo al fracaso': 'warn'
  };

  private static readonly statusSeverityMap: Record<string, Severity> = {
    'Activo': 'success',
    'Inactivo': 'secondary',
    'Demo activo': 'info',
    'Bajo uso': 'warn',
    'Error': 'danger',
  };

  /**
   * Determina la severidad de un tag basado en su contenido
   * @param tag Texto del tag
   * @returns Severidad del tag (info, warning, danger, etc.)
   */
  static getTagSeverity(tag: string): Severity {
    return this.severityMap[tag] ?? undefined;
  }

  /**
   * Determina la severidad de un estado basado en su valor
   * @param status Texto del estado
   * @returns Severidad del estado (success, secondary, info, warn, danger, contrast)
   */
  static getStatusSeverity(status: string): Severity {
    return this.statusSeverityMap[status] ?? undefined;
  }
}