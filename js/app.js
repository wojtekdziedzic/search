var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
(function () {
    var searchInput = document.getElementById('search-input');
    var resultsBody = document.getElementById('results-body');
    var resultsHeader = document.getElementById('results-header');
    var searchHint = document.getElementById('search-hint');
    searchInput.addEventListener('input', function (event) {
        var searchValue = getValueFromEvent(event);
        if (searchValue.length >= 1) {
            getDataCategories().then(function (data) {
                var categories = data.categories.filter(function (category) {
                    return category.toLowerCase().includes(searchValue.toLowerCase());
                });
                searchHint.innerHTML = '';
                categories.forEach(function (category) {
                    searchHint.appendChild(createHintItem(category));
                });
            });
        }
        else {
            searchHint.innerHTML = '';
        }
    });
    searchHint.addEventListener('click', function (event) {
        var searchText = getTextFromEvent(event);
        searchInput['value'] = searchText;
        searchHint.innerHTML = '';
        getSearchResults(searchText);
    });
    searchInput.addEventListener('keypress', function (event) {
        var searchValue = getValueFromEvent(event);
        if (event.key === 'Enter' && searchValue.length >= 1) {
            getSearchResults(searchValue);
        }
    });
    function getData() {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('https://api.publicapis.org/entries')];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2: return [2 /*return*/, (_a.sent())];
                }
            });
        });
    }
    function getDataCategories() {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('https://api.publicapis.org/categories')];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    }
    function getValueFromEvent(event) {
        return event.target['value'].trim();
    }
    function getTextFromEvent(event) {
        return event.target['innerText'].trim();
    }
    function getSearchResults(searchText) {
        clearDocument();
        resultsHeader.innerHTML = 'Searching...';
        getData().then(function (data) {
            var searchResults = data.entries.filter(function (item) {
                return (item.Description.toLowerCase().includes(searchText.toLowerCase()) ||
                    item.Category.toLowerCase().includes(searchText.toLowerCase()));
            });
            if (searchResults.length === 0) {
                resultsHeader.innerHTML = 'No results found';
            }
            else {
                resultsHeader.innerHTML = "Results for <br> ".concat(searchText, ":");
                for (var _i = 0, searchResults_1 = searchResults; _i < searchResults_1.length; _i++) {
                    var item = searchResults_1[_i];
                    resultsBody.innerHTML += "<div class=\"result-item\"><h3> Category: ".concat(item.Category, "</h3><p>Description: ").concat(item.Description, "</p><a href=\"").concat(item.Link, "\" target=\"_blank\">").concat(item.Link, "</a></div>");
                }
            }
        });
    }
    function createHintItem(item) {
        var element = document.createElement('div');
        element.className = 'hint-item';
        element.innerHTML = item;
        return element;
    }
    function clearDocument() {
        resultsHeader.innerHTML = '';
        resultsBody.innerHTML = '';
    }
})();
