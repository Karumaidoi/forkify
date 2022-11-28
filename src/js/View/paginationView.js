import View from "./View.js";
import icons from "url:../../img/icons.svg";

class PaginationView extends View {
    _parentElement = document.querySelector(".pagination");

    _generateMarkUp() {
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
        console.log(numPages);
        // 1. Page 1 and there are other pages
        if(this._data.page === 1 && numPages > 1) {
            return `
                <button class="btn--inline pagination__btn--next">
                    <span>Page ${this._data.page + 1}</span>
                    <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                    </svg>
                </button>
            `;
        }

        

        // 3 . Last Page
        if(this._data.page === numPages && numPages > 1) {
            return `
                <button class="btn--inline pagination__btn--prev">
                    <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                    </svg>
                    <span>Page ${this._data.page - 1}</span>
                </button>
            `;
        }

        // 4. Other Page
        if(this._data.page < numPages) {
            return `
                <button class="btn--inline pagination__btn--prev">
                    <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                    </svg>
                    <span>Page ${this._data.page - 1}</span>
                </button>

                <button class="btn--inline pagination__btn--next">
                <span>Page ${this._data.page + 1}</span>
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>
            `;
        }

        // 2. Page 1 and there aro no other pages
        return '';
    }

}

export default new PaginationView();