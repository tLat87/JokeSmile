import React, { useEffect, useState } from 'react';
import Sound from 'react-native-sound';
import { useSelector } from 'react-redux';

const BackgroundMusic = () => {
    const [backgroundMusic, setBackgroundMusic] = useState(null);
    const isMusicOn = useSelector(state => state.settings.musicOn);


    useEffect(() => {
        if (isMusicOn !== false) {
            const musicMain = new Sound('melody.wav', Sound.MAIN_BUNDLE, (error) => {
                if (error) {
                    console.log('Ошибка загрузки звука:', error);
                    return;
                }

                musicMain.setNumberOfLoops(-1);
                musicMain.setVolume(0.5);
                musicMain.play((success) => {
                    if (!success) {
                        console.log('Ошибка воспроизведения');
                    }
                });

                setBackgroundMusic(musicMain);
            });
        } else {
            if (backgroundMusic) {
                backgroundMusic.stop(() => backgroundMusic.release());
                setBackgroundMusic(null);
            }
        }

        return () => {
            if (backgroundMusic) {
                backgroundMusic.stop(() => backgroundMusic.release());
                setBackgroundMusic(null);
            }
        };
    }, [isMusicOn]);

    return null;
};

export default BackgroundMusic;
