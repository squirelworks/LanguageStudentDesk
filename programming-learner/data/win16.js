// Win16 course for the Programming Learner. Written for this project.
// Schema: see data/python.js. Win16 programs need Windows 3.x to run, so
// the examples here have no `out` and the practice is about reading code.
window.PROGRAMMING = window.PROGRAMMING || {};
window.PROGRAMMING.win16 = {
  id: "win16",
  name: "Win16",
  title: "Programming Windows 3.x",
  intro:
    "Windows 3.0 and 3.1 programs were usually written in C against the 16-bit Windows API. Everything happens through <b>messages</b>: Windows tells your program that a key was pressed, the window needs painting or the user wants to quit, and your code reacts. The same model still sits under modern Windows, so this is also a tour of how Win32 works. To build Win16 code today you need an old compiler such as Borland C++ 3.1, Microsoft C/C++ 7 or Open Watcom, run under Windows 3.1 in an emulator like 86Box, DOSBox-X or Bochs.",
  comment: "//",
  keywords: [
    "int", "char", "long", "void", "unsigned", "short", "static", "struct", "return", "if", "else", "switch", "case", "default",
    "break", "while", "for", "sizeof", "NULL", "FAR", "NEAR", "PASCAL", "CALLBACK", "WINAPI", "EXPORTS", "NAME", "EXETYPE",
  ],
  builtins: [
    "HWND", "HINSTANCE", "HDC", "UINT", "WPARAM", "LPARAM", "LRESULT", "LPSTR", "MSG", "WNDCLASS", "PAINTSTRUCT", "RECT", "BOOL",
    "WinMain", "RegisterClass", "CreateWindow", "ShowWindow", "UpdateWindow", "GetMessage", "TranslateMessage", "DispatchMessage",
    "DefWindowProc", "PostQuitMessage", "BeginPaint", "EndPaint", "TextOut", "MessageBox", "LoadCursor", "GetStockObject",
    "InvalidateRect", "GetClientRect", "CreatePen", "CreateSolidBrush", "SelectObject", "DeleteObject", "Rectangle", "Ellipse", "MoveTo", "LineTo",
    "SetTimer", "KillTimer", "DialogBox", "EndDialog", "MakeProcInstance", "FreeProcInstance", "GlobalAlloc", "GlobalLock", "GlobalUnlock", "GlobalFree",
    "wsprintf", "lstrlen", "LOWORD", "HIWORD", "SendMessage", "SetWindowText", "GetWindowText", "HGLOBAL", "HPEN", "HBRUSH", "FARPROC", "DWORD", "WORD",
  ],
  lessons: [
    {
      id: "skeleton",
      title: "WinMain and the message loop",
      summary: "Register a class, create a window, pump messages.",
      sections: [
        {
          p: "A Windows program starts in <code>WinMain</code>, not <code>main</code>. It registers a <b>window class</b> (which says which function handles its messages), creates a window of that class, and then loops, fetching messages and handing them on.",
          code: `#include <windows.h>

LRESULT CALLBACK WndProc(HWND, UINT, WPARAM, LPARAM);

int PASCAL WinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance,
                   LPSTR lpszCmdLine, int nCmdShow)
{
    WNDCLASS wc;
    HWND hwnd;
    MSG msg;

    if (!hPrevInstance) {               /* first copy registers the class */
        wc.style         = CS_HREDRAW | CS_VREDRAW;
        wc.lpfnWndProc   = WndProc;
        wc.cbClsExtra    = 0;
        wc.cbWndExtra    = 0;
        wc.hInstance     = hInstance;
        wc.hIcon         = LoadIcon(NULL, IDI_APPLICATION);
        wc.hCursor       = LoadCursor(NULL, IDC_ARROW);
        wc.hbrBackground = GetStockObject(WHITE_BRUSH);
        wc.lpszMenuName  = NULL;
        wc.lpszClassName = "Nutshell";
        if (!RegisterClass(&wc))
            return 0;
    }

    hwnd = CreateWindow("Nutshell", "Hello, Windows 3.1",
                        WS_OVERLAPPEDWINDOW,
                        CW_USEDEFAULT, CW_USEDEFAULT,
                        CW_USEDEFAULT, CW_USEDEFAULT,
                        NULL, NULL, hInstance, NULL);
    ShowWindow(hwnd, nCmdShow);
    UpdateWindow(hwnd);

    while (GetMessage(&msg, NULL, 0, 0)) {
        TranslateMessage(&msg);
        DispatchMessage(&msg);
    }
    return msg.wParam;
}`,
        },
        {
          h: "Reading it",
          p: "<code>hPrevInstance</code> is a Win16 detail: if another copy of the program is already running, its class is already registered, so only the first copy registers it (on Win32 this is always <code>NULL</code>). <code>GetMessage</code> waits for the next message and returns 0 when it gets <code>WM_QUIT</code>, which ends the loop. <code>TranslateMessage</code> turns key presses into character messages, and <code>DispatchMessage</code> calls your window procedure.",
        },
        {
          h: "Cooperative multitasking",
          p: "Windows 3.x programs share the CPU by taking turns: another program can only run while yours is waiting inside <code>GetMessage</code>. A long loop that never returns to the message loop freezes the whole desktop, not just your window.",
        },
      ],
      practice: [
        { q: "When does the message loop end?", options: ["When GetMessage receives WM_QUIT", "When the window is minimised", "After 1000 messages", "When WinMain returns 1"], answer: "When GetMessage receives WM_QUIT", why: "GetMessage returns 0 for WM_QUIT, and the while loop stops." },
        { q: "What tells Windows which function handles a window's messages?", options: ["lpfnWndProc in the window class", "The window title", "The return value of WinMain", "TranslateMessage"], answer: "lpfnWndProc in the window class", why: "Every window of a registered class sends its messages to that class's window procedure." },
        { q: "Why check hPrevInstance in Win16?", options: ["Only the first running copy needs to register the class", "It holds the command line", "It is the window handle", "It decides the window size"], answer: "Only the first running copy needs to register the class", why: "In Win16, instances of one program share registered classes." },
        { q: "A Win16 program runs a 10-second loop without checking messages. What happens?", options: ["The whole desktop stops responding", "Only its window freezes", "Windows ends it at once", "Nothing noticeable"], answer: "The whole desktop stops responding", why: "Windows 3.x multitasking is cooperative: no other program runs until yours yields." },
      ],
    },
    {
      id: "wndproc",
      title: "The window procedure",
      summary: "Handling WM_PAINT, WM_DESTROY and friends.",
      sections: [
        {
          p: "The window procedure is a big <code>switch</code> on the message number. Handle what you care about and pass everything else to <code>DefWindowProc</code>, which gives standard behaviour such as moving, resizing and closing.",
          code: `LRESULT CALLBACK WndProc(HWND hwnd, UINT msg, WPARAM wParam, LPARAM lParam)
{
    PAINTSTRUCT ps;
    HDC hdc;

    switch (msg) {
    case WM_PAINT:
        hdc = BeginPaint(hwnd, &ps);
        TextOut(hdc, 10, 10, "Hello from Win16", 16);
        EndPaint(hwnd, &ps);
        return 0;

    case WM_LBUTTONDOWN:
        MessageBox(hwnd, "You clicked!", "Nutshell", MB_OK);
        return 0;

    case WM_DESTROY:
        PostQuitMessage(0);
        return 0;
    }
    return DefWindowProc(hwnd, msg, wParam, lParam);
}`,
        },
        {
          h: "Key messages",
          p: "<code>WM_CREATE</code> arrives once when the window is made. <code>WM_PAINT</code> arrives whenever part of the window must be redrawn, so all drawing belongs there, between <code>BeginPaint</code> and <code>EndPaint</code>. <code>WM_DESTROY</code> means the window is going away; posting <code>WM_QUIT</code> with <code>PostQuitMessage</code> ends the message loop. <code>wParam</code> and <code>lParam</code> carry extra details, such as which key was pressed or where the mouse was.",
        },
      ],
      practice: [
        { q: "Where should a program draw its window's contents?", options: ["In WM_PAINT, between BeginPaint and EndPaint", "In WinMain before the loop", "In WM_CREATE only", "Anywhere, once"], answer: "In WM_PAINT, between BeginPaint and EndPaint", why: "Windows asks for repainting whenever the window is uncovered or resized, so drawing must happen on each WM_PAINT." },
        { q: "What should WM_DESTROY usually do in a main window?", options: ["Call PostQuitMessage(0)", "Call DefWindowProc only", "Call CreateWindow again", "Return 1"], answer: "Call PostQuitMessage(0)", why: "That posts WM_QUIT, which ends the message loop and the program." },
        { q: "What happens to messages your switch does not handle?", options: ["Pass them to DefWindowProc", "Ignore them by returning 0", "Send them back with PostMessage", "They crash the program"], answer: "Pass them to DefWindowProc", why: "DefWindowProc supplies the standard behaviour; returning 0 for everything would break moving, sizing and closing." },
      ],
    },
    {
      id: "input",
      title: "Keyboard and mouse",
      summary: "WM_CHAR, WM_KEYDOWN, mouse positions and asking for a repaint.",
      sections: [
        {
          p: "Input arrives as messages. <code>WM_KEYDOWN</code> reports a key by its <b>virtual-key code</b> (<code>VK_LEFT</code>, <code>VK_F1</code>), which is right for arrows and function keys. <code>WM_CHAR</code>, made by <code>TranslateMessage</code>, reports the character typed, which is right for text. Mouse messages such as <code>WM_LBUTTONDOWN</code> pack the position into <code>lParam</code>: x in the low word, y in the high word.",
          code: `static int x = 10, y = 10;     /* where the squirrel is */

case WM_KEYDOWN:
    switch (wParam) {
    case VK_LEFT:  x -= 8; break;
    case VK_RIGHT: x += 8; break;
    case VK_UP:    y -= 8; break;
    case VK_DOWN:  y += 8; break;
    }
    InvalidateRect(hwnd, NULL, TRUE);
    return 0;

case WM_LBUTTONDOWN:
    x = LOWORD(lParam);
    y = HIWORD(lParam);
    InvalidateRect(hwnd, NULL, TRUE);
    return 0;

case WM_PAINT:
    hdc = BeginPaint(hwnd, &ps);
    TextOut(hdc, x, y, "S", 1);
    EndPaint(hwnd, &ps);
    return 0;`,
        },
        {
          h: "Don't draw from input",
          p: "The handlers above do not draw. They change the program's state and call <code>InvalidateRect</code>, which marks the window as needing a repaint; Windows then sends <code>WM_PAINT</code> when the queue is quiet. Keeping all drawing in one place means the window always looks right, even after another window has covered it.",
        },
        {
          h: "Static variables",
          p: "The window procedure is called afresh for every message, so ordinary local variables forget their values between calls. <code>static</code> locals (or globals) keep state from one message to the next.",
        },
      ],
      practice: [
        { q: "Which message is best for reading typed text?", options: ["WM_CHAR", "WM_KEYDOWN", "WM_PAINT", "WM_COMMAND"], answer: "WM_CHAR", why: "WM_CHAR gives the actual character, with Shift and keyboard layout already applied." },
        { q: "Where is the mouse x position in WM_LBUTTONDOWN?", options: ["LOWORD(lParam)", "HIWORD(lParam)", "wParam", "LOWORD(wParam)"], answer: "LOWORD(lParam)", why: "lParam packs x in its low word and y in its high word." },
        { q: "What does InvalidateRect(hwnd, NULL, TRUE) do?", options: ["Asks for the whole window to be repainted soon", "Draws a rectangle", "Hides the window", "Clears the message queue"], answer: "Asks for the whole window to be repainted soon", why: "It marks the area as invalid; Windows later sends WM_PAINT to redraw it." },
        { q: "Why are the position variables static?", options: ["Ordinary locals are lost between messages", "Windows requires it", "So other programs can read them", "To make them faster"], answer: "Ordinary locals are lost between messages", why: "Each message is a new call to the window procedure; static keeps the values." },
      ],
    },
    {
      id: "gdi",
      title: "Drawing with the GDI",
      summary: "Device contexts, pens, brushes and shapes.",
      sections: [
        {
          p: "The <b>GDI</b> (Graphics Device Interface) draws through a <b>device context</b>, the <code>HDC</code> that <code>BeginPaint</code> hands you. To draw in a colour, create a pen (for lines) or a brush (for fills), select it into the DC, draw, then select the old one back and delete yours.",
          code: `case WM_PAINT:
    hdc = BeginPaint(hwnd, &ps);
    GetClientRect(hwnd, &rc);              /* size of the inside */

    hPen   = CreatePen(PS_SOLID, 2, RGB(128, 64, 0));
    hBrush = CreateSolidBrush(RGB(255, 200, 0));
    hOldPen   = SelectObject(hdc, hPen);
    hOldBrush = SelectObject(hdc, hBrush);

    Ellipse(hdc, 20, 20, 120, 100);        /* an acorn-coloured oval */
    Rectangle(hdc, 140, 20, 240, 100);
    MoveTo(hdc, 0, rc.bottom / 2);         /* a line across the middle */
    LineTo(hdc, rc.right, rc.bottom / 2);

    SelectObject(hdc, hOldPen);
    SelectObject(hdc, hOldBrush);
    DeleteObject(hPen);
    DeleteObject(hBrush);
    EndPaint(hwnd, &ps);
    return 0;`,
        },
        {
          h: "Why all the clean-up",
          p: "GDI objects come from a small shared pool in Windows 3.x (the GDI heap is 64 KB for the whole system). A program that creates a pen on every paint and never deletes it slowly starves every other program, and the desktop starts drawing wrongly. You must not delete an object while it is still selected into a DC, which is why the old ones are put back first.",
        },
        {
          h: "Win16 and Win32 differ here",
          p: "Win16 has <code>MoveTo(hdc, x, y)</code>, which returns the old position packed into a <code>DWORD</code>. Win32 replaced it with <code>MoveToEx(hdc, x, y, NULL)</code>, because 32-bit coordinates no longer fit two to a <code>DWORD</code>. Coordinates in Win16 are 16-bit, from −32768 to 32767.",
        },
      ],
      practice: [
        { q: "What must happen before DeleteObject(hPen)?", options: ["Select the old pen back into the DC", "Call EndPaint", "Call InvalidateRect", "Nothing"], answer: "Select the old pen back into the DC", why: "An object still selected into a DC must not be deleted." },
        { q: "Which object fills the inside of a Rectangle?", options: ["The selected brush", "The selected pen", "The window class", "The font"], answer: "The selected brush", why: "Pens draw outlines and lines; brushes fill areas." },
        { q: "What replaced MoveTo in Win32?", options: ["MoveToEx", "LineTo", "SetPixel", "MoveWindow"], answer: "MoveToEx", why: "MoveTo returned two 16-bit coordinates packed in a DWORD, which does not work with 32-bit coordinates." },
        { q: "A program creates a brush on every WM_PAINT and never deletes it. What happens over time?", options: ["The shared GDI heap fills and other programs draw wrongly", "Nothing; Windows frees it", "Only that window gets slower", "The brush colour fades"], answer: "The shared GDI heap fills and other programs draw wrongly", why: "In Windows 3.x the GDI heap is shared by every program, so leaks hurt everyone." },
      ],
    },
    {
      id: "resources",
      title: "Menus, resources and WM_COMMAND",
      summary: "The .rc file, menu IDs and handling commands.",
      sections: [
        {
          p: "Menus, dialog layouts, icons and strings live in a <b>resource script</b> (<code>.rc</code>), compiled by the resource compiler and attached to the <code>.exe</code>. Each menu item has an ID number, usually named in a shared header.",
          code: `/* nutshell.h */
#define IDM_NEW    100
#define IDM_ABOUT  101
#define IDM_EXIT   102

/* nutshell.rc */
#include <windows.h>
#include "nutshell.h"

NutshellMenu MENU
BEGIN
    POPUP "&File"
    BEGIN
        MENUITEM "&New",       IDM_NEW
        MENUITEM SEPARATOR
        MENUITEM "E&xit",      IDM_EXIT
    END
    POPUP "&Help"
    BEGIN
        MENUITEM "&About...",  IDM_ABOUT
    END
END`,
        },
        {
          h: "Hooking the menu up",
          p: "Name the menu in the window class (<code>wc.lpszMenuName = \"NutshellMenu\";</code>). Choosing an item sends <code>WM_COMMAND</code> with the item's ID in <code>wParam</code>. The <code>&amp;</code> marks the underlined letter for keyboard use.",
          code: `case WM_COMMAND:
    switch (wParam) {
    case IDM_NEW:
        /* start again */
        return 0;
    case IDM_ABOUT:
        MessageBox(hwnd, "Nutshell 1.0", "About", MB_OK | MB_ICONINFORMATION);
        return 0;
    case IDM_EXIT:
        DestroyWindow(hwnd);       /* leads to WM_DESTROY */
        return 0;
    }
    break;`,
        },
        {
          h: "The module definition file",
          p: "A Win16 program also needs a <code>.def</code> file. It names the program, says how its code and data segments behave in memory, sets the heap and stack sizes, and <b>exports</b> every function that Windows calls back, such as the window procedure.",
          code: `NAME         NUTSHELL
DESCRIPTION  'Nutshell for Windows 3.1'
EXETYPE      WINDOWS
STUB         'WINSTUB.EXE'
CODE         PRELOAD MOVEABLE DISCARDABLE
DATA         PRELOAD MOVEABLE MULTIPLE
HEAPSIZE     1024
STACKSIZE    8192
EXPORTS      WndProc`,
        },
        {
          h: "The stub",
          p: "<code>WINSTUB.EXE</code> is a tiny DOS program built into the front of every Windows <code>.exe</code>. Run the program from plain DOS and the stub prints “This program requires Microsoft Windows.” instead of crashing.",
        },
      ],
      practice: [
        { q: "Which message does choosing a menu item send?", options: ["WM_COMMAND", "WM_MENU", "WM_CLICK", "WM_PAINT"], answer: "WM_COMMAND", why: "Menu choices and control notifications both arrive as WM_COMMAND." },
        { q: "In Win16, where is the menu item's ID?", options: ["wParam", "LOWORD(lParam)", "HIWORD(lParam)", "The message number"], answer: "wParam", why: "In Win16, wParam holds the ID of the menu item or control." },
        { q: "Why list WndProc under EXPORTS?", options: ["Windows calls it from outside the program", "To make it public to other programs", "To speed it up", "So it appears in the menu"], answer: "Windows calls it from outside the program", why: "Win16 callbacks must be exported so Windows can set up the program's data segment when it calls them." },
        { q: "What does the & in \"E&xit\" do?", options: ["Underlines x as the keyboard shortcut", "Joins two strings", "Makes the item bold", "Disables the item"], answer: "Underlines x as the keyboard shortcut", why: "The letter after & is underlined and can be pressed with Alt or while the menu is open." },
      ],
    },
    {
      id: "dialogs",
      title: "Dialog boxes and controls",
      summary: "Dialog templates, dialog procedures, MakeProcInstance and child controls.",
      sections: [
        {
          p: "A dialog box is laid out in the <code>.rc</code> file and driven by a <b>dialog procedure</b>, which looks like a window procedure but returns <code>TRUE</code> for messages it handled and <code>FALSE</code> otherwise. <code>WM_INITDIALOG</code> arrives before it is shown; <code>EndDialog</code> closes it.",
          code: `AboutBox DIALOG 20, 20, 160, 70
STYLE DS_MODALFRAME | WS_POPUP | WS_CAPTION | WS_SYSMENU
CAPTION "About Nutshell"
BEGIN
    CTEXT         "Nutshell 1.0", -1, 0, 12, 160, 8
    CTEXT         "Gathers nuts since 1992", -1, 0, 24, 160, 8
    DEFPUSHBUTTON "OK", IDOK, 64, 48, 32, 14
END`,
        },
        {
          h: "Showing it, Win16 style",
          p: "In Win16 a callback such as a dialog procedure cannot be passed straight to Windows. <code>MakeProcInstance</code> builds a small piece of code (a <b>thunk</b>) that loads the right data segment for this copy of the program and then jumps to your function. Free it again with <code>FreeProcInstance</code>. The dialog procedure must also be exported in the <code>.def</code> file.",
          code: `BOOL CALLBACK AboutDlgProc(HWND hdlg, UINT msg, WPARAM wParam, LPARAM lParam)
{
    switch (msg) {
    case WM_INITDIALOG:
        return TRUE;                   /* let Windows set the focus */
    case WM_COMMAND:
        if (wParam == IDOK || wParam == IDCANCEL) {
            EndDialog(hdlg, 0);
            return TRUE;
        }
        break;
    }
    return FALSE;
}

/* in WndProc, for IDM_ABOUT: */
    lpfnDlg = MakeProcInstance((FARPROC) AboutDlgProc, hInst);
    DialogBox(hInst, "AboutBox", hwnd, lpfnDlg);
    FreeProcInstance(lpfnDlg);`,
        },
        {
          h: "Controls are windows",
          p: "Buttons, edit boxes and list boxes are child windows of predefined classes such as <code>\"BUTTON\"</code> and <code>\"EDIT\"</code>. They tell their parent about events with <code>WM_COMMAND</code>. In Win16 the control's ID is in <code>wParam</code>, its window handle in <code>LOWORD(lParam)</code> and the notification code (such as <code>BN_CLICKED</code>) in <code>HIWORD(lParam)</code>. Win32 moved the notification code into <code>HIWORD(wParam)</code>, one of the classic porting traps.",
          code: `hwndBtn = CreateWindow("BUTTON", "Gather",
                       WS_CHILD | WS_VISIBLE | BS_PUSHBUTTON,
                       10, 10, 80, 24,
                       hwnd, (HMENU) IDC_GATHER, hInst, NULL);

case WM_COMMAND:
    if (wParam == IDC_GATHER && HIWORD(lParam) == BN_CLICKED) {
        nuts++;
        InvalidateRect(hwnd, NULL, TRUE);
    }
    return 0;`,
        },
      ],
      practice: [
        { q: "What should a dialog procedure return for a message it did not handle?", options: ["FALSE", "DefWindowProc(...)", "TRUE", "0 always means handled"], answer: "FALSE", why: "Dialog procedures return TRUE or FALSE; the dialog manager does the default work when you return FALSE." },
        { q: "Why does Win16 code call MakeProcInstance?", options: ["To make a thunk that sets up the data segment before the callback runs", "To create a new instance of the program", "To make the dialog modal", "To load the dialog template"], answer: "To make a thunk that sets up the data segment before the callback runs", why: "Several running copies share code but each has its own data segment; the thunk loads the right one." },
        { q: "In Win16 WM_COMMAND from a button, where is BN_CLICKED?", options: ["HIWORD(lParam)", "HIWORD(wParam)", "wParam", "LOWORD(lParam)"], answer: "HIWORD(lParam)", why: "Win16 puts the notification code in the high word of lParam; Win32 moved it to HIWORD(wParam)." },
        { q: "Which message lets a dialog fill in its controls before it appears?", options: ["WM_INITDIALOG", "WM_CREATE", "WM_PAINT", "WM_SHOWWINDOW"], answer: "WM_INITDIALOG", why: "Dialogs get WM_INITDIALOG after their controls exist but before they are shown." },
      ],
    },
    {
      id: "memory",
      title: "Segments and memory",
      summary: "16-bit ints, near and far pointers, and moveable global memory.",
      sections: [
        {
          p: "Win16 runs on the 8086 family's <b>segmented</b> memory: an address is a 16-bit segment plus a 16-bit offset, and one segment holds at most 64 KB. A <code>NEAR</code> pointer is just an offset inside the current data segment (2 bytes); a <code>FAR</code> pointer carries a segment too (4 bytes). Win16 API calls that take strings or buffers use far pointers such as <code>LPSTR</code>.",
          code: `int      n;          /* 16 bits: -32768 to 32767 */
long     big;        /* 32 bits */
char NEAR *pn;       /* 2-byte pointer within our data segment */
char FAR  *pf;       /* 4-byte segment:offset pointer */
LPSTR    text;       /* the same as char FAR * */`,
        },
        {
          h: "Global memory",
          p: "Large or long-lived blocks come from the global heap. <code>GlobalAlloc</code> returns a <b>handle</b>, not an address, because Windows may move the block to make room. <code>GlobalLock</code> pins it and gives a far pointer; <code>GlobalUnlock</code> lets it move again. Keep blocks unlocked between messages so Windows can shuffle memory.",
          code: `HGLOBAL hMem;
char FAR *p;

hMem = GlobalAlloc(GMEM_MOVEABLE | GMEM_ZEROINIT, 4096);
if (hMem) {
    p = GlobalLock(hMem);
    lstrcpy(p, "acorn store");
    /* ... use p ... */
    GlobalUnlock(hMem);
}
/* later, when finished: */
GlobalFree(hMem);`,
        },
        {
          h: "Why handles",
          p: "Windows 3.x might run in real mode (3.0), standard mode or 386 enhanced mode, often on machines with 1 or 2 MB of RAM. Moveable and discardable memory let it compact the heap and throw away code segments it can load again from disk. Handles are what made that possible, and they are why so much of the API passes <code>HWND</code>, <code>HDC</code>, <code>HGLOBAL</code> rather than pointers.",
        },
        {
          h: "Formatting text",
          p: "The C library's <code>sprintf</code> works, but Windows has its own smaller <code>wsprintf</code> that writes into a far buffer. <code>TextOut</code> needs the length, which <code>lstrlen</code> gives.",
          code: `char buf[40];
wsprintf(buf, "Nuts: %d", nuts);
TextOut(hdc, 10, 10, buf, lstrlen(buf));`,
        },
      ],
      practice: [
        { q: "How big is an int in a Win16 C compiler?", options: ["16 bits", "32 bits", "8 bits", "64 bits"], answer: "16 bits", why: "Win16 compilers target 16-bit processors, so int runs from −32768 to 32767; use long for bigger numbers." },
        { q: "Why does GlobalAlloc return a handle rather than a pointer?", options: ["Windows may move the block, so its address can change", "Pointers are not allowed in C", "Handles are faster", "To hide the size"], answer: "Windows may move the block, so its address can change", why: "Moveable memory is pinned with GlobalLock only while you use it." },
        { q: "What is a FAR pointer?", options: ["A segment plus an offset: 4 bytes", "An offset in the current segment: 2 bytes", "A pointer to the end of memory", "A handle"], answer: "A segment plus an offset: 4 bytes", why: "A far pointer can reach any segment; a near one only the current data segment." },
        { q: "What is the most one segment can hold?", options: ["64 KB", "640 KB", "1 MB", "16 KB"], answer: "64 KB", why: "A 16-bit offset reaches 65,536 bytes." },
      ],
    },
    {
      id: "timers",
      title: "Timers and animation",
      summary: "SetTimer, WM_TIMER, KillTimer and staying cooperative.",
      sections: [
        {
          p: "A program cannot sit in a loop waiting for time to pass: that would freeze Windows 3.x. Instead it asks for <code>WM_TIMER</code> messages with <code>SetTimer</code> and does a little work each time one arrives. Timers are a shared, limited resource, so check that <code>SetTimer</code> succeeded and kill the timer when the window goes away.",
          code: `#define ID_TICK 1

case WM_CREATE:
    if (!SetTimer(hwnd, ID_TICK, 500, NULL)) {   /* every half second */
        MessageBox(hwnd, "Too many timers!", "Nutshell", MB_OK);
        return -1;                               /* window is not created */
    }
    return 0;

case WM_TIMER:
    frame = (frame + 1) % 4;                     /* next animation frame */
    InvalidateRect(hwnd, NULL, FALSE);
    return 0;

case WM_DESTROY:
    KillTimer(hwnd, ID_TICK);
    PostQuitMessage(0);
    return 0;`,
        },
        {
          h: "Timers are not exact",
          p: "<code>WM_TIMER</code> is a low-priority message: it is only delivered when the queue has nothing else, and several missed ticks arrive as one. The PC clock also ticks only about 18.2 times a second, so intervals shorter than about 55 ms are not honoured. For a clock, read the actual time on each tick instead of counting ticks.",
        },
        {
          h: "Long jobs",
          p: "For a long calculation, either split it into small steps done on each <code>WM_TIMER</code>, or call <code>PeekMessage</code> now and then inside the loop to let other programs run. Both keep the desktop alive.",
        },
      ],
      practice: [
        { q: "How should a Win16 program do something every second?", options: ["SetTimer and handle WM_TIMER", "A while loop that checks the clock", "Sleep(1000) in WinMain", "A second thread"], answer: "SetTimer and handle WM_TIMER", why: "Loops and sleeping block cooperative multitasking; Windows 3.x has no threads." },
        { q: "Ten ticks were due while the program was busy. How many WM_TIMER messages arrive?", options: ["One", "Ten", "None", "Eleven"], answer: "One", why: "Timer messages are not queued up; missed ticks are combined." },
        { q: "Why call KillTimer in WM_DESTROY?", options: ["Timers are a shared, limited resource", "Otherwise the window will not close", "To stop the clock for every program", "It is only tidiness"], answer: "Timers are a shared, limited resource", why: "A timer that is never killed keeps one of the few system-wide slots busy." },
      ],
    },
    {
      id: "porting",
      title: "From Win16 to Win32",
      summary: "What changed on the way to Windows 95 and NT.",
      sections: [
        {
          p: "Most of the API kept its name when Windows went 32-bit, so a lot of Win16 code compiles for Win32 after a tidy-up. The things that bite are the ones that depended on 16-bit sizes and segments.",
        },
        {
          h: "The classic changes",
          p: "<code>int</code> and <code>WPARAM</code> grew to 32 bits, so <code>WM_COMMAND</code>'s fields moved: the control ID is now <code>LOWORD(wParam)</code>, the notification <code>HIWORD(wParam)</code> and the control handle <code>lParam</code>. <code>NEAR</code> and <code>FAR</code> mean nothing in the flat 32-bit address space. <code>MakeProcInstance</code> is no longer needed. <code>hPrevInstance</code> is always <code>NULL</code>, because every program runs in its own address space. Functions that packed two coordinates into one return value gained <code>Ex</code> versions (<code>MoveToEx</code>, <code>SetWindowOrgEx</code>).",
          code: `/* Win16 */
case WM_COMMAND:
    if (wParam == IDC_GATHER && HIWORD(lParam) == BN_CLICKED) ...

/* Win32 */
case WM_COMMAND:
    if (LOWORD(wParam) == IDC_GATHER && HIWORD(wParam) == BN_CLICKED) ...`,
        },
        {
          h: "Pre-emptive multitasking",
          p: "Win32 programs are pre-empted: a long loop freezes only their own window. But a window that stops reading messages still looks hung to the user, so the habits from Win16 (short handlers, timers for slow work) are still good ones. Win32 adds threads for work that really must run for a long time.",
        },
      ],
      practice: [
        { q: "In Win32 WM_COMMAND, where is the control ID?", options: ["LOWORD(wParam)", "wParam as a whole", "HIWORD(lParam)", "LOWORD(lParam)"], answer: "LOWORD(wParam)", why: "With a 32-bit wParam, the ID and notification code share it: ID low, code high." },
        { q: "What is hPrevInstance in a Win32 program?", options: ["Always NULL", "The previous copy's instance", "The parent window", "The DLL handle"], answer: "Always NULL", why: "Each Win32 process has its own address space, so it cannot share another's instance." },
        { q: "Which Win16 call is simply unnecessary in Win32?", options: ["MakeProcInstance", "RegisterClass", "GetMessage", "BeginPaint"], answer: "MakeProcInstance", why: "There are no per-instance data segments to set up in a flat address space." },
        { q: "Why did MoveTo become MoveToEx?", options: ["The old return value packed two 16-bit coordinates into 32 bits", "MoveTo was too slow", "To add colour", "Ex means for Excel"], answer: "The old return value packed two 16-bit coordinates into 32 bits", why: "With 32-bit coordinates the old position no longer fits, so MoveToEx returns it through a POINT pointer." },
      ],
    },
  ],
};
