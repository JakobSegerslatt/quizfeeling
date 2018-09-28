export const MOVIESOUNDS: SoundSource[] = [
    {
        name: 'Ace Ventura',
        path: 'http://www.moviewavs.com/0053148414/MP3S/Movies/Ace_Ventura/alright1.mp3',
        quote: 'Alrighty then!',
    },
    {
        name: 'Back to the Future',
        path: 'http://www.moviewavs.com/0053148414/MP3S/Movies/Back_To_The_Future/backtothefuture.mp3',
        quote: 'Marty, you´ve gotta come back with me!',
        seconds: 3.6,
    },
    {
        name: 'Blades of Glory',
        path: 'http://www.moviewavs.com/0053148414/MP3S/Movies/Blades_Of_Glory/provocative.mp3',
        quote: 'No one know what it means, but it´s provocative.'
    },
    {
        name: 'Juno',
        path: 'http://www.moviewavs.com/0053148414/MP3S/Movies/Juno/shutyourgob.mp3',
        quote: 'Geez, Banana, shut your friggin" gob, okay?!'
    },
    {
        name: 'Jurassic Park',
        path: 'http://www.moviewavs.com/0053148414/MP3S/Movies/Jurassic_Park/unix.mp3',
        quote: 'It`s a Unix System, I know this',
    },
    {
        name: 'Lethal Weapon',
        path: 'http://www.moviewavs.com/0053148414/MP3S/Movies/Lethal_Weapon/realgun.mp3',
        quote: `Now that's a real badge. I'm a real cop and this is a real bleeping gun!`,
    },
    {
        name: 'Madagaskar',
        path: 'http://www.moviewavs.com/0053148414/MP3S/Movies/Madagascar/soannoying.mp3',
        quote: `Oh, shut up. You're so annoying!`,
    },
    {
        name: 'Pulp Fiction',
        path: 'http://www.moviewavs.com/0053148414/MP3S/Movies/Pulp_Fiction/bigbrain.mp3',
        quote: `Check out the big brain on Brett! You're a smart motherbleeper, that's right! The metric system.`,
        seconds: 3.5
    },
    {
        name: 'Pulp Fiction',
        path: 'http://www.moviewavs.com/0053148414/MP3S/Movies/Pulp_Fiction/concentr.mp3',
        quote: `Oh, I'm sorry. Did I break your concentration?`,
    },
    {
        name: 'Rush Hour 2',
        path: 'http://www.moviewavs.com/0053148414/MP3S/Movies/Rush_Hour_2/damn.mp3',
        quote: `Damn, he ain't gonna be in Rush Hour 3. (Everybody laughs.)`,
        seconds: 3.3
    },
    {
        name: 'Rush Hour 2',
        path: 'http://www.moviewavs.com/0053148414/MP3S/Movies/Rush_Hour_2/thewords.mp3',
        quote: `Don't nobody understand the words that are coming out of your mouth man.`,
        seconds: 3
    },
    {
        name: 'Star Wars IV: A new Hope',
        // tslint:disable-next-line:max-line-length
        path: 'http://www.moviewavs.com/0053148414/MP3S/Movies/Star_Wars_Episode_IV_A_New_Hope/r2d2whereareyou.mp3',
        quote: `R2-D2, where are you?`,
    },
    {
        name: 'Starship Troopers',
        path: 'http://www.moviewavs.com/0053148414/MP3S/Movies/Starship_Troopers/bug.mp3',
        quote: `he only good bug is a dead bug.`,
    },
    {
        name: 'Superbad',
        path: 'http://www.moviewavs.com/0053148414/MP3S/Movies/Superbad/inthehouse.mp3',
        quote: `McLovin in the bleepin' house!`,
    },
    {
        name: 'Team America',
        path: 'http://www.moviewavs.com/0053148414/MP3S/Movies/Team_America_World_Police/worldpolice.mp3',
        quote: `World Police! Get down on the ground!`,
    },
    {
        name: 'Team America',
        path: 'http://www.moviewavs.com/0053148414/MP3S/Movies/Team_America_World_Police/sostupid.mp3',
        quote: `Why is everyone so bleeping stupid?`,
    },
    {
        name: 'Terminator',
        path: 'http://www.moviewavs.com/0053148414/MP3S/Movies/Terminator/hasta.mp3',
        quote: `Hasta la vista, Baby.`,
    },
    {
        name: 'Terminator',
        path: 'http://www.moviewavs.com/0053148414/MP3S/Movies/Terminator/term6.mp3',
        quote: `You just can't go around killing people! Why?`,
    },
    {
        name: 'Top Gun',
        path: 'http://www.moviewavs.com/0053148414/MP3S/Movies/Top_Gun/stud.mp3',
        quote: `Hey Goose you big stud! That's me honey!`,
        seconds: 3.8
    },
    {
        name: 'Top Gun',
        path: 'http://www.moviewavs.com/0053148414/MP3S/Movies/Top_Gun/ego_cash.mp3',
        quote: `Son, your ego is writing checks your body can't cash.`,
    },
    {
    name: 'Wizard of Oz',
    path: 'http://www.moviewavs.com/0053148414/MP3S/Movies/Wizard_Of_Oz/oz6.mp3',
    quote: `Toto...I've a feeling we're not in Kansas anymore.`,
    },
    {
    name: 'Bruce Almighty',
    path: 'http://www.moviewavs.com/0053148414/MP3S/Movies/Bruce_Almighty/beautiful.mp3',
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
