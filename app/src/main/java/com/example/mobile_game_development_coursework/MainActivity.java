package com.example.mobile_game_development_coursework;

import androidx.appcompat.app.AppCompatActivity;
import android.os.Bundle;
//import android.support.v7.app.AppCompatActivity;
import android.webkit.WebView;
import android.view.View;

public class MainActivity extends AppCompatActivity
{
    /*
        @Override
        protected void onCreate(Bundle savedInstanceState)
        {
            super.onCreate(savedInstanceState);
            setContentView(R.layout.activity_main);
        }
     */
    WebView webView;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        View decorView = getWindow().getDecorView();
        // set IMMERSIVE flag;
        //set the content to apprear under the system so that the content
        // doesn't resize when the system bars hide and show

        int uiOptions = View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION // HIDE NAV BAR
                | View.SYSTEM_UI_FLAG_FULLSCREEN
                | View.SYSTEM_UI_FLAG_IMMERSIVE;
        decorView.setSystemUiVisibility(uiOptions);

        setContentView(R.layout.activity_main);

        //(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        webView = (WebView)findViewById(R.id.webview1);

        webView.getSettings().setJavaScriptEnabled(true);
        webView.loadUrl("file:///android_asset/game.html");
    }
}