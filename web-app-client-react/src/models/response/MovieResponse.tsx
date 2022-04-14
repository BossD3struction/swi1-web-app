export default interface MovieResponse {
    id: number;
    name: string;
    year: number;
    runningTime: number;
    bannerLink: string;
    about: string;
    genresId: number[];
}
