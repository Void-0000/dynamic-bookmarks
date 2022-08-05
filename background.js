tabsToBookmarks = {};
groupId = undefined;



loadTabsFromSession(function(tabsData, groupData){
    console.log(tabsToBookmarks);
    tabsToBookmarks = tabsData;
    if (tabsToBookmarks == undefined) {
        tabsToBookmarks = {};
    }
    console.log(tabsToBookmarks);
    groupId = groupData;
    everything();
});

function everything() {
    chrome.webNavigation.onCompleted.addListener(function(details){
        findDynamicBookmark(details.url, function(dynamicBookmark){
            if (dynamicBookmark != undefined) {
                tabsToBookmarks[details.tabId] = dynamicBookmark;
                chrome.tabs.group({tabIds: details.tabId, groupId: undefined}, function(groupId2){ //groupId set to undefined for now
                    groupId = groupId2;
                    saveTabsToSession(tabsToBookmarks, groupId, function(){
                    });
                });
            }
        });
    },{url: [{querySuffix: "?dynamic-bookmark"}]});
}

chrome.webNavigation.onCompleted.addListener(function(details2) { //Second Listener
    console.log(tabsToBookmarks);
    if (Object.keys(tabsToBookmarks).includes(details2.tabId.toString())) {
        chrome.tabs.get(details2.tabId, function(tab) {
            newUrl = tab.url;
            if (!newUrl.endsWith("?dynamic-bookmark")) {
                newUrl = newUrl +"?dynamic-bookmark";
            }
            chrome.bookmarks.update(tabsToBookmarks[tab.id].id, {url: newUrl});
        });
    }
});


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

function saveTabsToSession(dataTabs, dataGroup, callback) {
    console.log(dataTabs);
    chrome.storage.session.set({tabsData: dataTabs, groupData: dataGroup}, callback());
}

function loadTabsFromSession(callback) {
    chrome.storage.session.get(["tabsData", "groupData"], function(results){
        console.log(results.tabsData);
        callback(results.tabsData, results.groupData);
    });
}
