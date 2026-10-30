// Win16 course for the Programming Learner. Written for this project.
// Schema: see data/python.js.
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
    "break", "while", "for", "sizeof", "NULL", "FAR", "NEAR", "PASCAL", "CALLBACK", "WINAPI",
  ],
  builtins: [
    "HWND", "HINSTANCE", "HDC", "UINT", "WPARAM", "LPARAM", "LRESULT", "LPSTR", "MSG", "WNDCLASS", "PAINTSTRUCT", "RECT", "BOOL",
    "WinMain", "RegisterClass", "CreateWindow", "ShowWindow", "UpdateWindow", "GetMessage", "TranslateMessage", "DispatchMessage",
    "DefWindowProc", "PostQuitMessage", "BeginPaint", "EndPaint", "TextOut", "MessageBox", "LoadCursor", "GetStockObject",
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
  ],
};
