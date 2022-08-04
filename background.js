tabsToBookmarks = {}; //Failsafe in case of two different dynamic bookmark tabs being open at once.

chrome.webNavigation.onCompleted.addListener(function(details){
    findDynamicBookmark(details.url, function(dynamicBookmark){
        if (dynamicBookmark != undefined) {
            dynamicBookmarkTabId = details.tabId;
            tabsToBookmarks[dynamicBookmarkTabId] = dynamicBookmark; //Failsafe
            chrome.tabs.group({tabIds: dynamicBookmarkTabId}, function(groupId){
                chrome.webNavigation.onCompleted.addListener(function(details){
                    if (details.tabId == dynamicBookmarkTabId) {
                        chrome.tabs.get(details.tabId, function(tab){
                            var newUrl = tab.url;
                            if (!newUrl.endsWith("?dynamic-bookmark")) {
                                newUrl = newUrl +"?dynamic-bookmark";
                            }
                            if (tabsToBookmarks[dynamicBookmarkTabId] == dynamicBookmark) { //More failsafe
                                chrome.bookmarks.update(dynamicBookmark.id, {url: newUrl});
                            }
                        });
                    }
                });
            });
        }
    });
},{url: [{querySuffix: "?dynamic-bookmark"}]});

function findDynamicBookmark(url, callback){
    chrome.bookmarks.search({title:"Dynamic Bookmarks"}, function(results){
        var dynamicBookmarksFolder = results[0];

        chrome.bookmarks.getChildren(dynamicBookmarksFolder.id, function(result) {
            var dynamicBookmark = result.find(function(o) {
                if (o.url == url) {
                    return true;
                }
            });
            callback(dynamicBookmark);
        })
    });
}
