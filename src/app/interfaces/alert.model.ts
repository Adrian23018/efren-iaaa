export interface Alert {
    alertId: number | string;
    userName: string;
    userEmail?: string;
    planName?: string;
    alertType: string;
    createdAt?: string;
}
