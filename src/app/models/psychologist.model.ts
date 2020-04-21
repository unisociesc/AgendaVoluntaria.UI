export interface IVolunteerNeedPsychologistData {
    data: IVolunteerNeedPsychologist[];
}

export interface IVolunteerNeedPsychologist {
    id: string;
    ra: number;
    course: string;
    idUser: string;
    needPsico: boolean;
    user: IVolunteerUserInfo;
}

export interface IVolunteerUserInfo {
    name: string;
    cpf: string;
    phone: string;
    email: string;
}
