# dynamic-bookmarks
A chrome extension that automatically updates bookmarks.

This is intended to be used to bookmark pages where the URL changes as a result of use (e.g. streaming sites that store the episode number in the URL, or webnovels/webcomics that do the same with a page/chapter number). It does this by automatically updating the URL of your bookmark every time the URL of the tab you opened it in changes.

To use it (after installing the extension itself), add "?dynamic-bookmark" at the end of any URL when making a bookmark, and put those bookmarks in a folder called "Dynamic Bookmarks". After that, just open them like normal, the extention will add the tab to a new group automatically to show that it's being tracked.

Limitations:
- Some websites edit query strings to fit a particular format, which causes the extension to not recognize them. Obviously, any page that already has query strings won't work either. There's probably a way to work around this, but currently the websites I've seen do this probably wouldn't benefit from this extension anyway.
- The extension can't track tabs across different sessions (reloading the extension/chrome). Again, there's probably a way around that but it doesn't seem like a big deal.
- ~~The extension currently can't track multiple tabs at once, if you try to open two dynamic bookmarks, only the latest one will actually update. I originally made this extension to reduce the number of tabs I had open, so I'm tempted to just call this a feature.~~ You can now have multiple tracked tabs open at once.
- MOST IMPORTANTLY: This should be obvious, but because of how the extension works, the last URL you visited on the tracked tab is the one that's going to show up in your bookmarks folder, so close it after you're done and don't just go to another website.
