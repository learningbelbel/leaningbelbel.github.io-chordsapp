import { Accordion, AccordionTab } from 'primereact/accordion'
import { useState, useEffect } from 'react';
import { SongService } from '../../service/Service.Song';

interface SongLine {
    chords: string;
    lyric: string;
}

interface Song {
    name: string;
    verse: SongLine[];
    chorus: SongLine[];
}

export const Chords = () => {


    const service = new SongService();
    const [song, setSong] = useState<Song[]>([]);

    useEffect(() => {
        getSong();
    }, [])

    const getSong = async () => {
        const res = await service.getSongs();
        setSong(res);
    }

    const contentGeneration = (lineas: SongLine[]) => {
        return lineas.map(({ chords, lyric }, index) => (
            <div key={index} className='lyric-container' >
                <pre style={{fontWeight: 'bold', color: 'orange'}}>{chords}</pre>
                {lyric}
            </div>
        ));
    };

    const songGeneration = (song: Song) => (
        <AccordionTab header={song.name} key={song.name} className='acordionTab'>
            {contentGeneration(song.verse)}
            <h3>Coro</h3>
            {contentGeneration(song.chorus)}
        </AccordionTab>
    );
    return (
        <div className="container">
            <h1>Listado</h1>
            <Accordion activeIndex={0} className='acordion'>
                {song.map(songGeneration)}
            </Accordion>
        </div>
    )
}
