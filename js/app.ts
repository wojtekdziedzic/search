(() => {
  const searchInput: HTMLElement = document.getElementById('search-input');
  const resultsBody: HTMLElement = document.getElementById('results-body');
  const resultsHeader: HTMLHeadElement = document.getElementById('results-header');
  const searchHint: HTMLElement = document.getElementById('search-hint');

  searchInput.addEventListener('input', (event: Event): void => {
    const searchValue = getValueFromEvent(event);
    if (searchValue.length >= 1) {
      getDataCategories().then((data: ICategoriesResponse): void => {
        const categories: string[] = data.categories.filter((category: string) => {
          return category.toLowerCase().includes(searchValue.toLowerCase());
        });
        searchHint.innerHTML = '';
        categories.forEach((category: string): void => {
          searchHint.appendChild(createHintItem(category));
        });
      });
    } else {
      searchHint.innerHTML = '';
    }
  });

  searchHint.addEventListener('click', (event: Event): void => {
    const searchText = getTextFromEvent(event);
    searchInput['value'] = searchText;
    searchHint.innerHTML = '';
    getSearchResults(searchText);
  });

  searchInput.addEventListener('keypress', (event: KeyboardEvent): void => {
    const searchValue: string = getValueFromEvent(event);
    if (event.key === 'Enter' && searchValue.length >= 1) {
      getSearchResults(searchValue);
    }
  });

  async function getData(): Promise<IResponse> {
    const response: Response = await fetch('https://api.publicapis.org/entries');
    return (await response.json()) as IResponse;
  }

  async function getDataCategories(): Promise<ICategoriesResponse> {
    const response: Response = await fetch('https://api.publicapis.org/categories');
    return await response.json();
  }

  function getValueFromEvent(event: Event): string {
    return event.target['value'].trim();
  }

  function getTextFromEvent(event: Event): string {
    return event.target['innerText'].trim();
  }

  function getSearchResults(searchText: string): void {
    clearDocument();
    resultsHeader.innerHTML = 'Searching...';
    getData().then((data: IResponse): void => {
      const searchResults: IEntry[] = data.entries.filter((item: IEntry) => {
        return (
          item.Description.toLowerCase().includes(searchText.toLowerCase()) ||
          item.Category.toLowerCase().includes(searchText.toLowerCase())
        );
      });

      if (searchResults.length === 0) {
        resultsHeader.innerHTML = 'No results found';
      } else {
        resultsHeader.innerHTML = `Results for <br> ${searchText}:`;

        for (let item of searchResults) {
          resultsBody.innerHTML += `<div class="result-item"><h3> Category: ${item.Category}</h3><p>Description: ${item.Description}</p><a href="${item.Link}" target="_blank">${item.Link}</a></div>`;
        }
      }
    });
  }

  function createHintItem(item: string): HTMLDivElement {
    const element: HTMLDivElement = document.createElement('div');
    element.className = 'hint-item';
    element.innerHTML = item;
    return element;
  }

  function clearDocument() {
    resultsHeader.innerHTML = '';
    resultsBody.innerHTML = '';
  }
})();

interface IResponse {
  entries: IEntry[];
  count: number;
}
interface ICategoriesResponse {
  categories: string[];
  count: number;
}

interface IEntry {
  API: string;
  Auth: string;
  Category: string;
  Cors: string;
  Description: string;
  HTTPS: boolean;
  Link: string;
}
