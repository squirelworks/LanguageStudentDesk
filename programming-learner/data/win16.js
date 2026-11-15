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
    "OpenClipboard", "CloseClipboard", "EmptyClipboard", "SetClipboardData", "GetClipboardData", "IsClipboardFormatAvailable", "CF_TEXT",
    "lstrcpyn", "LoadLibrary", "GetProcAddress", "LibMain", "UnlockData", "LIBRARY", "HEAPSIZE", "STACKSIZE", "STUB",
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
        { q: "What does TranslateMessage do in the message loop?", options: ["Turns key-down messages into WM_CHAR", "Draws the window", "Registers the window class", "Ends the program"], answer: "Turns key-down messages into WM_CHAR", why: "TranslateMessage converts virtual-key presses into character messages before DispatchMessage." },
        { q: "Where does a Windows program start instead of main?", options: ["WinMain", "WndProc", "GetMessage", "RegisterClass"], answer: "WinMain", why: "Windows looks for WinMain as the entry point of a GUI program." },
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
        { q: "Which message arrives once when the window is first made?", options: ["WM_CREATE", "WM_PAINT", "WM_QUIT", "WM_TIMER"], answer: "WM_CREATE", why: "WM_CREATE is sent during CreateWindow, before the window is shown." },
        { q: "What does BeginPaint return for use while drawing?", options: ["An HDC (device context)", "A brush", "A window handle", "A menu"], answer: "An HDC (device context)", why: "BeginPaint prepares the window for painting and gives you the HDC to draw with." },
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
        { q: "Which message is best for arrow keys such as VK_LEFT?", options: ["WM_KEYDOWN", "WM_CHAR", "WM_COMMAND", "WM_TIMER"], answer: "WM_KEYDOWN", why: "Arrow and function keys arrive as virtual-key codes in WM_KEYDOWN, not as characters." },
        { q: "Where is the mouse y position in WM_LBUTTONDOWN?", options: ["HIWORD(lParam)", "LOWORD(lParam)", "wParam", "HIWORD(wParam)"], answer: "HIWORD(lParam)", why: "lParam packs x low and y high." },
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
        { q: "What does CreatePen create?", options: ["A pen for drawing lines and outlines", "A brush for filling areas", "A new window", "A font"], answer: "A pen for drawing lines and outlines", why: "Pens stroke paths; CreateSolidBrush makes a fill colour." },
        { q: "What does GetClientRect fill in?", options: ["The size of the window's inside area", "The screen resolution", "The menu bar size", "The GDI heap free space"], answer: "The size of the window's inside area", why: "GetClientRect returns the client rectangle in a RECT, used for layout and drawing." },
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
        { q: "Where do menus and dialog layouts live before they are built into the .exe?", options: ["A resource script (.rc)", "WinMain", "The message loop", "A .COM file"], answer: "A resource script (.rc)", why: "The resource compiler turns the .rc into resources attached to the executable." },
        { q: "What does WINSTUB.EXE do?", options: ["Prints a message if the program is run from plain DOS", "Starts Windows", "Registers the window class", "Draws the icon"], answer: "Prints a message if the program is run from plain DOS", why: "The stub is a tiny DOS program at the front of the .exe that refuses to run without Windows." },
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
        { q: "What closes a modal dialog started with DialogBox?", options: ["EndDialog", "DestroyWindow only", "PostQuitMessage", "FreeProcInstance"], answer: "EndDialog", why: "EndDialog ends the dialog's own message loop and returns from DialogBox." },
        { q: "After DialogBox returns, what should you do with the MakeProcInstance result?", options: ["Call FreeProcInstance", "Call GlobalFree", "Call KillTimer", "Nothing"], answer: "Call FreeProcInstance", why: "The thunk is no longer needed; FreeProcInstance releases it." },
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
        { q: "What does GlobalLock do?", options: ["Pins a moveable block and returns a far pointer", "Frees the block", "Allocates a new segment", "Starts the message loop"], answer: "Pins a moveable block and returns a far pointer", why: "While locked, Windows will not move the block; unlock it when you are done using the pointer." },
        { q: "What is LPSTR?", options: ["char FAR * — a far pointer to a string", "A near pointer to an int", "A window handle", "A GDI pen"], answer: "char FAR * — a far pointer to a string", why: "Win16 API string parameters use far pointers so they can reach any segment." },
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
        { q: "What should you do if SetTimer fails in WM_CREATE?", options: ["Return -1 so the window is not created", "Ignore it and keep going", "Call KillTimer", "Call PostQuitMessage at once"], answer: "Return -1 so the window is not created", why: "Returning -1 from WM_CREATE cancels window creation when a needed timer cannot be allocated." },
        { q: "How can a long calculation stay cooperative without SetTimer?", options: ["Call PeekMessage now and then inside the loop", "Use Sleep between steps", "Spawn a second thread", "Disable the message loop"], answer: "Call PeekMessage now and then inside the loop", why: "PeekMessage lets other programs run while you keep working through a long job." },
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
        { q: "In Win32 WM_COMMAND, where is the notification code such as BN_CLICKED?", options: ["HIWORD(wParam)", "HIWORD(lParam)", "LOWORD(lParam)", "wParam as a whole"], answer: "HIWORD(wParam)", why: "Win32 packs ID and notification into wParam; the control handle is lParam." },
        { q: "What happened to NEAR and FAR in Win32?", options: ["They mean nothing in the flat 32-bit address space", "They became larger", "NEAR is required for strings", "FAR replaced HWND"], answer: "They mean nothing in the flat 32-bit address space", why: "Win32 uses a single linear address space, so segment:offset pointers go away." },
      ],
    },
    {
      id: "clipboard",
      title: "The clipboard",
      summary: "Share text between programs with OpenClipboard and CF_TEXT.",
      sections: [
        {
          p: "Windows 3.x programs share selected text (and later bitmaps and other formats) through the <b>clipboard</b>. Only one program owns it at a time. You open it, optionally empty it, put data in or take data out, then close it. The data lives in a global memory block with a format tag such as <code>CF_TEXT</code>.",
          code: `/* Copy a C string to the clipboard as CF_TEXT */
void CopyText(HWND hwnd, char FAR *text)
{
    HGLOBAL hMem;
    char FAR *p;
    int len;

    len = lstrlen(text) + 1;
    hMem = GlobalAlloc(GMEM_MOVEABLE, len);
    if (!hMem)
        return;
    p = GlobalLock(hMem);
    lstrcpy(p, text);
    GlobalUnlock(hMem);

    if (OpenClipboard(hwnd)) {
        EmptyClipboard();
        SetClipboardData(CF_TEXT, hMem);   /* ownership passes to Windows */
        CloseClipboard();
    } else {
        GlobalFree(hMem);                  /* open failed: free it ourselves */
    }
}`,
        },
        {
          h: "Reading text back",
          p: "Check that the format you want is available, then lock the handle Windows gives you. Do not free clipboard data while it is on the clipboard — Windows owns it after a successful <code>SetClipboardData</code>.",
          code: `void PasteText(HWND hwnd, char FAR *buf, int buflen)
{
    HGLOBAL hMem;
    char FAR *p;

    if (!IsClipboardFormatAvailable(CF_TEXT))
        return;
    if (!OpenClipboard(hwnd))
        return;
    hMem = GetClipboardData(CF_TEXT);
    if (hMem) {
        p = GlobalLock(hMem);
        if (p) {
            /* copy out; leave the block locked only briefly */
            lstrcpyn(buf, p, buflen);
            GlobalUnlock(hMem);
        }
    }
    CloseClipboard();
}`,
        },
        {
          h: "Ownership and formats",
          p: "After <code>SetClipboardData</code>, do not <code>GlobalFree</code> that handle: the clipboard will free it when something else empties the clipboard. Other common formats include <code>CF_BITMAP</code> and <code>CF_METAFILE</code>. Programs can register private formats with <code>RegisterClipboardFormat</code> when they need a custom structure.",
        },
        {
          h: "Keep the open short",
          p: "Hold the clipboard open only for the few lines that empty, set or get data. Another program cannot open it while yours holds it, and a crash with the clipboard open can leave the desktop awkward until restart. Copy into your own buffer, close, then work with the copy.",
        },
      ],
      practice: [
        { q: "What must you call before SetClipboardData?", options: ["OpenClipboard", "BeginPaint", "RegisterClass", "CreateWindow"], answer: "OpenClipboard", why: "The clipboard is a shared resource; OpenClipboard claims it for your window." },
        { q: "Who owns the memory after a successful SetClipboardData?", options: ["Windows (the clipboard)", "Your program forever", "The previous owner", "Nobody"], answer: "Windows (the clipboard)", why: "Do not GlobalFree that handle yourself; EmptyClipboard or a later Set will free it." },
        { q: "Which format is plain null-terminated text?", options: ["CF_TEXT", "CF_BITMAP", "CF_METAFILE", "CF_OWNERDISPLAY"], answer: "CF_TEXT", why: "CF_TEXT is the classic ANSI text format on Win16." },
        { q: "What should you do if OpenClipboard fails after GlobalAlloc for a copy?", options: ["GlobalFree the block yourself", "Call SetClipboardData anyway", "Ignore the failure", "Call PostQuitMessage"], answer: "GlobalFree the block yourself", why: "Ownership never passed to the clipboard, so your program must free the allocation." },
        { q: "Why keep OpenClipboard … CloseClipboard as short as possible?", options: ["Other programs cannot open the clipboard while you hold it", "Windows deletes your window otherwise", "Timers stop", "GDI pens leak"], answer: "Other programs cannot open the clipboard while you hold it", why: "The clipboard is exclusive; a long hold blocks paste and copy elsewhere." },
        { q: "Before GetClipboardData for text, what is a good check?", options: ["IsClipboardFormatAvailable(CF_TEXT)", "hPrevInstance != NULL", "PeekMessage", "KillTimer"], answer: "IsClipboardFormatAvailable(CF_TEXT)", why: "Avoid opening and finding nothing useful when the user has only a bitmap on the clipboard." },
      ],
    },
    {
      id: "module-def",
      title: "Module definition and DLLs",
      summary: "The .DEF file, EXPORTS, and a tiny Win16 DLL.",
      sections: [
        {
          p: "A Win16 program is a <b>module</b>. Besides the .C sources you usually ship a <code>.DEF</code> file that names the module, says it is a Windows app, and lists functions that other modules may call. The linker reads that file when it builds the .EXE or .DLL.",
          code: `; nutshell.def — for an ordinary Windows program
NAME        NUTSHELL
DESCRIPTION 'Gather nuts under Windows 3.1'
EXETYPE     WINDOWS
STUB        'WINSTUB.EXE'
CODE        PRELOAD MOVEABLE DISCARDABLE
DATA        PRELOAD MOVEABLE MULTIPLE
HEAPSIZE    1024
STACKSIZE   8192`,
        },
        {
          h: "What the lines mean",
          p: "<code>NAME</code> is the module name Windows shows. <code>EXETYPE WINDOWS</code> marks a Windows program rather than a DOS one. <code>STUB</code> is a tiny DOS program that prints an error if someone runs the EXE from plain DOS. <code>CODE</code> and <code>DATA</code> say how segments load; <code>MOVEABLE DISCARDABLE</code> lets Windows throw code away and reload it from disk when RAM is tight. <code>MULTIPLE</code> data gives each running copy its own data segment — that is why <code>hPrevInstance</code> mattered in WinMain.",
        },
        {
          h: "A tiny DLL",
          p: "A DLL is also a module, but it uses <code>LIBRARY</code> instead of <code>NAME</code>, and it exports entry points. Other programs load it with <code>LoadLibrary</code> / <code>GetProcAddress</code>, or the linker binds the import at build time.",
          code: `; nuts.dll — nutshell.def for a library
LIBRARY     NUTS
DESCRIPTION 'Shared helpers for Nutshell'
EXETYPE     WINDOWS
CODE        PRELOAD MOVEABLE DISCARDABLE
DATA        PRELOAD MOVEABLE SINGLE
HEAPSIZE    1024
EXPORTS
    AddNuts   @1
    ClearNuts @2

/* nuts.c */
#include <windows.h>

int FAR PASCAL AddNuts(int a, int b)
{
    return a + b;
}

void FAR PASCAL ClearNuts(int FAR *p)
{
    if (p)
        *p = 0;
}

int FAR PASCAL LibMain(HINSTANCE hInstance, WORD wDataSeg,
                       WORD cbHeapSize, LPSTR lpCmdLine)
{
    if (cbHeapSize != 0)
        UnlockData(0);
    return 1;   /* success */
}`,
        },
        {
          h: "Calling from the EXE",
          p: "Declare the DLL function with the same calling convention the export used (<code>FAR PASCAL</code> on Win16), and either link an import library or load it by hand. Always match the ordinal or name you put under <code>EXPORTS</code>.",
          code: `/* In the EXE */
int FAR PASCAL AddNuts(int, int);   /* from NUTS.DLL */

case WM_COMMAND:
    if (wParam == IDC_GATHER)
        nuts = AddNuts(nuts, 1);
    break;`,
        },
      ],
      practice: [
        { q: "What does a .DEF file tell the linker?", options: ["Module name, type, segment flags and exports", "Only the icon", "The colour of the title bar", "Which compiler to use"], answer: "Module name, type, segment flags and exports", why: "NAME/LIBRARY, EXETYPE, CODE/DATA and EXPORTS are the usual contents." },
        { q: "Which .DEF keyword starts a DLL instead of an EXE?", options: ["LIBRARY", "NAME", "STUB", "HEAPSIZE"], answer: "LIBRARY", why: "EXE modules use NAME; DLLs use LIBRARY." },
        { q: "Why mark CODE as DISCARDABLE?", options: ["Windows can throw the segment away and reload it from disk", "It runs faster", "It shares data between copies", "It disables the message loop"], answer: "Windows can throw the segment away and reload it from disk", why: "On small RAM machines discardable code frees memory when another program needs it." },
        { q: "What does DATA MULTIPLE mean for an EXE?", options: ["Each running copy gets its own data segment", "Data is read-only", "Data is shared with every DLL", "The stack is unlimited"], answer: "Each running copy gets its own data segment", why: "That is why the first instance registers the class and later copies see a non-NULL hPrevInstance." },
        { q: "Where do you list AddNuts so other modules can call it?", options: ["Under EXPORTS in the .DEF file", "Only in WinMain", "In the resource .RC file", "In WINSTUB.EXE"], answer: "Under EXPORTS in the .DEF file", why: "EXPORTS publishes the names or ordinals other modules may import." },
        { q: "What should LibMain return on success?", options: ["1", "0", "-1", "WM_QUIT"], answer: "1", why: "A zero return means the DLL failed to initialise and Windows unloads it." },
      ],
    },
  ],
};
