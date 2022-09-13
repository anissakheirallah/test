export class Cv {

    id: number;
    availability: string;
    comment: string;
    candidateId:number;
    domainsId:Array<number> = [];
    skillsId:Array<number> = [];
    globalExperiencesId:Array<number> = [];
    educationsId:Array<number> = [];
    languagesId:Array<number> = [];
    candidaciesId:Array<number> = [];

    constructor(
        availability: string,
        comment: string,
        candidateId:number
    ) {
        this.availability = availability;
        this.comment = comment;
        this.candidateId = candidateId;
    }

}
