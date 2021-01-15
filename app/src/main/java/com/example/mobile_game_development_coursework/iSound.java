package com.example.mobile_game_development_coursework;

import android.content.Context;
import android.content.res.AssetFileDescriptor;
import android.media.AudioAttributes;
import android.media.AudioManager;
import android.media.MediaPlayer;
import android.media.SoundPool;
import android.os.Build;
import android.util.Log;
import android.webkit.JavascriptInterface;

import java.util.HashMap;
import java.util.Map;

public class iSound
{
    private Context ctx;
    private SoundPool sounds = null;
    private Map<String, Integer> soundIDs = new HashMap<String, Integer>();
    private static MediaPlayer music;

    iSound(final Context context)
    {
        //cache the app context
        ctx = context;

        //create a sound pool
        if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP)
        {
            sounds = new SoundPool.Builder().setMaxStreams(3).setAudioAttributes(new AudioAttributes.Builder().setContentType(AudioAttributes.CONTENT_TYPE_MUSIC).build()).build();
        }
        else
        {
            sounds = new SoundPool(3, AudioManager.STREAM_MUSIC, 0);
        }

        //load SFX sounds into sound pool
        try
        {
            //Load sound using the asset file descriptor
            AssetFileDescriptor afd = ctx.getAssets().openFd("Audio/pop.wav");
            //store the id outputted by the sound pool in the sound effects array
            soundIDs.put("Audio/pop.wav", sounds.load(afd.getFileDescriptor(), afd.getStartOffset(), afd.getLength(), 0));
            afd.close();
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }

        iSound.music = new MediaPlayer();
    }

    @JavascriptInterface
    public void PlaySound(String id)
    {
        //sound pool is used for short sound clips
        Integer sound = soundIDs.get(id);
        if (sound != null)
        {
            sounds.play(sound, 1, 1, 0, 0, 1);
        }
    }

    @JavascriptInterface
    public void PlayMusic(String id)
    {
        //media player is used for longer music tracks
        iSound.music.reset();//reset player as we are changing tracks
        try
        {
            //load the file and prepare the media player
            AssetFileDescriptor afd = ctx.getAssets().openFd(id);
            iSound.music.setDataSource(afd.getFileDescriptor(), afd.getStartOffset(), afd.getLength());
            afd.close();
            iSound.music.setLooping(true); //we set our music track to loop
            iSound.music.prepare();
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }
        iSound.music.start();
    }
}
