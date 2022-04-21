export default interface CreateMovieRequest {
    name: string;
    year: number;
    runningTime: number;
    bannerLink: string;
    about: string;
    genresId: number[];
}
