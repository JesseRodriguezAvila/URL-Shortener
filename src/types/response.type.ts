
type HttpResponse = {
    success: boolean;
    status_code: number;
    status_message: string;
}

export type HttpSuccessResponse = HttpResponse & {
    data?: any
}

export type HttpErrorResponse = HttpResponse & {
    stack?: string
}