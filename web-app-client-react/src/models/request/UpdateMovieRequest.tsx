export default interface UpdateMovieRequest {
    id: number;
    name: string;
    year: number;
    runningTime: number;
    bannerLink: string;
    about: string;
    genresId: number[];
}
