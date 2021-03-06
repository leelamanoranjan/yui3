/**
 * <p>
 * Provides pre-built accent-folding result matching filters for AutoComplete.
 * </p>
 *
 * <p>
 * These filters are similar to the ones provided by the
 * <code>autocomplete-filters</code> module, but use accent-aware comparisons.
 * For example, "resume" and "résumé" will be considered equal when using the
 * accent-folding filters.
 * </p>
 *
 * @module autocomplete
 * @submodule autocomplete-filters-accentfold
 */

/**
 * @class AutoCompleteFilters
 * @static
 */

var AccentFold = Y.Text.AccentFold,
    WordBreak  = Y.Text.WordBreak,
    YArray     = Y.Array,
    YObject    = Y.Object;

Y.mix(Y.namespace('AutoCompleteFilters'), {
    /**
     * Accent folding version of <code>charMatch()</code>.
     *
     * @method charMatchFold
     * @param {String} query Query to match
     * @param {Array} results Results to filter
     * @return {Array} Filtered results
     * @static
     */
    charMatchFold: function (query, results) {
        var queryChars = YArray.unique(AccentFold.fold(query).split(''));

        return YArray.filter(results, function (result) {
            var text = AccentFold.fold(result.text);

            return YArray.every(queryChars, function (chr) {
                return text.indexOf(chr) !== -1;
            });
        });
    },

    /**
     * Accent folding version of <code>phraseMatch()</code>.
     *
     * @method phraseMatchFold
     * @param {String} query Query to match
     * @param {Array} results Results to filter
     * @return {Array} Filtered results
     * @static
     */
    phraseMatchFold: function (query, results) {
        query = AccentFold.fold(query);

        return YArray.filter(results, function (result) {
            return AccentFold.fold(result.text).indexOf(query) !== -1;
        });
    },

    /**
     * Accent folding version of <code>startsWithFold()</code>.
     *
     * @method startsWithFold
     * @param {String} query Query to match
     * @param {Array} results Results to filter
     * @return {Array} Filtered results
     * @static
     */
    startsWithFold: function (query, results) {
        query = AccentFold.fold(query);

        return YArray.filter(results, function (result) {
            return AccentFold.fold(result.text).indexOf(query) === 0;
        });
    },

    /**
     * Accent folding version of <code>wordMatchFold()</code>.
     *
     * @method wordMatchFold
     * @param {String} query Query to match
     * @param {Array} results Results to filter
     * @return {Array} Filtered results
     * @static
     */
    wordMatchFold: function (query, results) {
        var queryWords = WordBreak.getUniqueWords(AccentFold.fold(query));

        return YArray.filter(results, function (result) {
            // Convert resultWords array to a hash for fast lookup.
            var resultWords = YArray.hash(WordBreak.getUniqueWords(
                    AccentFold.fold(result.text)));

            return YArray.every(queryWords, function (word) {
                return YObject.owns(resultWords, word);
            });
        });
    }
});
