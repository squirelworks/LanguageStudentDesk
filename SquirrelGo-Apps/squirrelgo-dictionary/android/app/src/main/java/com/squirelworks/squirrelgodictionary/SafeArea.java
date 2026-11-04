package com.squirelworks.squirrelgodictionary;

import android.app.Activity;
import android.content.res.TypedArray;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.ColorFilter;
import android.graphics.Paint;
import android.graphics.PixelFormat;
import android.graphics.drawable.Drawable;
import android.os.Build;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.view.WindowManager;

import androidx.annotation.NonNull;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.core.view.WindowInsetsControllerCompat;

/**
 * Keeps the app's WebView inside the part of the screen that is safe to read:
 * clear of the camera cutout, the status bar, the gesture or button bar, and
 * the on-screen keyboard, in portrait and landscape.
 *
 * Android 15 and later always draw apps edge to edge, so without this the top
 * of every page sits under the status bar and the camera cutout. This makes
 * every Android version behave the same way: the app draws edge to edge, and
 * the WebView's parent is padded by the system insets. The padding is painted
 * in the theme's status bar color at the top and its navigation bar color
 * elsewhere, so the bars look as they did before.
 *
 * Shared source: edit SquirrelGo-Apps/shared/android/SafeArea.java, then run
 * SquirrelGo-Apps/tools/sync-shared.sh to copy it into each app.
 */
final class SafeArea {
    private SafeArea() {
    }

    /** Call right after setContentView(). Pads the layout's root view. */
    @SuppressWarnings("deprecation") // bar colors: still used before Android 15
    static void apply(Activity activity) {
        View root = ((ViewGroup) activity.findViewById(android.R.id.content)).getChildAt(0);
        Window window = activity.getWindow();
        WindowCompat.setDecorFitsSystemWindows(window, false);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
            // Let the window reach the cutout edge in landscape too; the padding
            // below keeps content out of it.
            WindowManager.LayoutParams lp = window.getAttributes();
            lp.layoutInDisplayCutoutMode = Build.VERSION.SDK_INT >= Build.VERSION_CODES.R
                    ? WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_ALWAYS
                    : WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES;
            window.setAttributes(lp);
        }

        TypedArray a = activity.getTheme().obtainStyledAttributes(new int[]{
                android.R.attr.statusBarColor, android.R.attr.navigationBarColor});
        int statusColor = a.getColor(0, Color.BLACK);
        int navColor = a.getColor(1, Color.BLACK);
        a.recycle();

        // The bars are drawn by the padding below, not by the system.
        window.setStatusBarColor(Color.TRANSPARENT);
        window.setNavigationBarColor(Color.TRANSPARENT);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            window.setStatusBarContrastEnforced(false);
            window.setNavigationBarContrastEnforced(false);
        }
        WindowInsetsControllerCompat bars = WindowCompat.getInsetsController(window, window.getDecorView());
        bars.setAppearanceLightStatusBars(isLight(statusColor));
        bars.setAppearanceLightNavigationBars(isLight(navColor));

        BarsBackground background = new BarsBackground(statusColor, navColor);
        root.setBackground(background);

        ViewCompat.setOnApplyWindowInsetsListener(root, (v, insets) -> {
            Insets safe = insets.getInsets(WindowInsetsCompat.Type.systemBars()
                    | WindowInsetsCompat.Type.displayCutout()
                    | WindowInsetsCompat.Type.ime());
            v.setPadding(safe.left, safe.top, safe.right, safe.bottom);
            background.setTop(safe.top);
            // Consumed here, so the page's own env(safe-area-inset-*) padding
            // stays at 0 inside the app and isn't added twice.
            return WindowInsetsCompat.CONSUMED;
        });
        ViewCompat.requestApplyInsets(root);
    }

    private static boolean isLight(int color) {
        double l = 0.299 * Color.red(color) + 0.587 * Color.green(color) + 0.114 * Color.blue(color);
        return l > 160;
    }

    /** Status bar color across the top inset, navigation bar color everywhere else. */
    private static final class BarsBackground extends Drawable {
        private final Paint status = new Paint();
        private final Paint rest = new Paint();
        private int top;

        BarsBackground(int statusColor, int navColor) {
            status.setColor(statusColor);
            rest.setColor(navColor);
        }

        void setTop(int px) {
            if (px == top) return;
            top = px;
            invalidateSelf();
        }

        @Override
        public void draw(@NonNull Canvas canvas) {
            android.graphics.Rect b = getBounds();
            canvas.drawRect(b, rest);
            if (top > 0) canvas.drawRect(b.left, b.top, b.right, b.top + top, status);
        }

        @Override
        public void setAlpha(int alpha) {
        }

        @Override
        public void setColorFilter(ColorFilter colorFilter) {
        }

        @Override
        @SuppressWarnings("deprecation")
        public int getOpacity() {
            return PixelFormat.OPAQUE;
        }
    }
}
