package pl.rr.cordovawarsawapp;

/**
 * Created by Rafal on 2014-05-10.
 */

import android.os.Bundle;

import org.apache.cordova.DroidGap;

public class CordovaWarsawApp extends DroidGap {

        @Override
        public void onCreate(Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);
            //super.setIntegerProperty("loadUrlTimeoutValue", 60000);
            super.loadUrl("file:///android_asset/www/index.html");

        }

}
