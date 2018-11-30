export const MOVIESOUNDS: SoundSource[] = [
    {
        name: 'Ace Ventura',
        path: 'alright1.mp3',
        quote: 'Alrighty then!',
    },
    {
        name: 'Back to the Future',
        path: 'backtothefuture.mp3',
        quote: 'Marty, you´ve gotta come back with me!',
        seconds: 3.8,
    },
    {
        name: 'Blades of Glory',
        path: 'provocative.mp3',
        quote: 'No one know what it means, but it´s provocative.'
    },
    {
        name: 'Juno',
        path: 'shutyourgob.mp3',
        quote: 'Geez, Banana, shut your friggin" gob, okay?!'
    },
    {
        name: 'Jurassic Park',
        path: 'unix.mp3',
        quote: 'It`s a Unix System, I know this',
    },
    {
        name: 'Lethal Weapon',
        path: 'realgun.mp3',
        quote: `Now that's a real badge. I'm a real cop and this is a real fucking gun!`,
    },
    {
        name: 'Madagaskar',
        path: 'soannoying.mp3',
        quote: `Oh, shut up. You're so annoying!`,
    },
    {
        name: 'Pulp Fiction',
        path: 'bigbrain.mp3',
        quote: `Check out the big brain on Brett! You're a smart motherfucker, that's right! The metric system.`,
        seconds: 3.5
    },
    {
        name: 'Pulp Fiction',
        path: 'concentr.mp3',
        quote: `Oh, I'm sorry. Did I break your concentration?`,
    },
    {
        name: 'Rush Hour 2',
        path: 'damn.mp3',
        quote: `Damn, he ain't gonna be in Rush Hour 3. (Everybody laughs.)`,
        seconds: 3.3
    },
    {
        name: 'Rush Hour 2',
        path: 'thewords.mp3',
        quote: `Don't nobody understand the words that are coming out of your mouth man.`,
        seconds: 3
    },
    {
        name: 'Star Wars IV: A new Hope',
        // tslint:disable-next-line:max-line-length
        path: 'r2d2whereareyou.mp3',
        quote: `R2-D2, where are you?`,
    },
    {
        name: 'Starship Troopers',
        path: 'bug.mp3',
        quote: `he only good bug is a dead bug.`,
    },
    {
        name: 'Superbad',
        path: 'inthehouse.mp3',
        quote: `McLovin in the fukin' house!`,
    },
    {
        name: 'Team America',
        path: 'worldpolice.mp3',
        quote: `World Police! Get down on the ground!`,
    },
    {
        name: 'Team America',
        path: 'sostupid.mp3',
        quote: `Why is everyone so fukin stupid?`,
    },
    {
        name: 'Terminator',
        path: 'hasta.mp3',
        quote: `Hasta la vista, Baby.`,
    },
    {
        name: 'Terminator',
        path: 'term6.mp3',
        quote: `You just can't go around killing people! Why?`,
    },
    {
        name: 'Top Gun',
        path: 'stud.mp3',
        quote: `Hey Goose you big stud! That's me honey!`,
        seconds: 3.8
    },
    {
        name: 'Top Gun',
        path: 'ego_cash.mp3',
        quote: `Son, your ego is writing checks your body can't cash.`,
    },
    {
    name: 'Wizard of Oz',
    path: 'oz6.mp3',
    quote: `Toto...I've a feeling we're not in Kansas anymore.`,
    },
    {
    name: 'Bruce Almighty',
    path: 'beautiful.mp3',
    quote: `B-E-A-utiful`,
    },
];

export interface SoundSource {
    name: string;
    path: string;
    quote: string;
    scipSeconds?: string;
    seconds?: number;
    img?: string;
}
