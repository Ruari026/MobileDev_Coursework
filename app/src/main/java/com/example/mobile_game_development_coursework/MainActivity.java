package com.example.mobile_game_development_coursework;

import androidx.appcompat.app.AppCompatActivity;
import android.os.Bundle;
import android.content.pm.ActivityInfo;
//import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.webkit.WebView;
import android.view.View;

public class MainActivity extends AppCompatActivity
{
    WebView webView;
    iSound iS;

    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);

        View decorView = getWindow().getDecorView();
        // set IMMERSIVE flag;
        //set the content to appear under the system so that the content
        // doesn't resize when the system bars hide and show
        int uiOptions = View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION // HIDE NAV BAR
                | View.SYSTEM_UI_FLAG_FULLSCREEN
                | View.SYSTEM_UI_FLAG_IMMERSIVE;
        decorView.setSystemUiVisibility(uiOptions);

        setContentView(R.layout.activity_main);
        iS = new iSound(getApplicationContext());

        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
        if (savedInstanceState != null)
        {
            webView = (WebView)findViewById(R.id.webview1);
            webView.getSettings().setJavaScriptEnabled(true);
            webView.loadUrl("file:///android_asset/game.html");
            webView.addJavascriptInterface(iS, "soundManager");
        }
    }
}