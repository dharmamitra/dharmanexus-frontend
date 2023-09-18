/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CountMatchesInput } from "../models/CountMatchesInput";
import type { GeneralInput } from "../models/GeneralInput";
import type { GraphInput } from "../models/GraphInput";
import type { MiddleInput } from "../models/MiddleInput";
import type { MultiLangInput } from "../models/MultiLangInput";
import type { SearchInput } from "../models/SearchInput";
import type { TextParallelsInput } from "../models/TextParallelsInput";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class DefaultService {
  /**
   * Get Search Results
   * Returns search results for given search string.
   * :return: List of search results
   * @param requestBody
   * @returns any Successful Response
   * @throws ApiError
   */
  public static getSearchResultsSearchPost(
    requestBody: SearchInput
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/search/",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Get Graph For File
   * Endpoint for graph view
   * @param requestBody
   * @returns any Successful Response
   * @throws ApiError
   */
  public static getGraphForFileGraphViewPost(
    requestBody: GraphInput
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/graph-view/",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Get Visual View For File
   * Endpoint for visual view
   * @param searchterm
   * @param language
   * @param selected
   * @returns any Successful Response
   * @throws ApiError
   */
  public static getVisualViewForFileVisualViewGet(
    searchterm: string,
    language: string,
    selected?: Array<string>
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/visual-view/",
      query: {
        searchterm: searchterm,
        language: language,
        selected: selected,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Get Table View
   * Endpoint for the table view. Accepts filters.
   * :return: List of segments and parallels for the table view.
   * @param requestBody
   * @returns any Successful Response
   * @throws ApiError
   */
  public static getTableViewTableViewTablePost(
    requestBody: GeneralInput
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/table-view/table",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Get Table Download
   * Endpoint for the download table. Accepts filters.
   * :return: List of segments and parallels for the downloaded table view.
   * @param requestBody
   * @returns any Successful Response
   * @throws ApiError
   */
  public static getTableDownloadTableViewDownloadPost(
    requestBody: GeneralInput
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/table-view/download",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Get Multilang
   * Endpoint for the multilingual table view. Accepts Parallel languages
   * :return: List of segments and parallels for the table view.
   * @param requestBody
   * @returns any Successful Response
   * @throws ApiError
   */
  public static getMultilangTableViewMultilangPost(
    requestBody: MultiLangInput
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/table-view/multilang",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Get Parallels For Middle
   * :return: List of parallels for text view (middle)
   * @param requestBody
   * @returns any Successful Response
   * @throws ApiError
   */
  public static getParallelsForMiddleTextViewMiddlePost(
    requestBody: MiddleInput
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/text-view/middle/",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Get File Text Segments And Parallels
   * Endpoint for text view. Returns preformatted text segments and ids of the corresponding parallels.
   * @param requestBody
   * @returns any Successful Response
   * @throws ApiError
   */
  public static getFileTextSegmentsAndParallelsTextViewTextParallelsPost(
    requestBody: TextParallelsInput
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/text-view/text-parallels/",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Get Numbers View
   * Endpoint for numbers view. Input parameters are the same as for table view.
   * @param requestBody
   * @returns any Successful Response
   * @throws ApiError
   */
  public static getNumbersViewNumbersViewNumbersPost(
    requestBody: GeneralInput
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/numbers-view/numbers",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Get External Links
   * Returns the external links for a given filename or segmentnr.
   * @param fileName
   * @param segmentnr
   * @returns any Successful Response
   * @throws ApiError
   */
  public static getExternalLinksLinksExternalGet(
    fileName: string,
    segmentnr: string
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/links/external/",
      query: {
        file_name: fileName,
        segmentnr: segmentnr,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Get Counts For File
   * Returns number of filtered parallels
   * @param requestBody
   * @returns any Successful Response
   * @throws ApiError
   */
  public static getCountsForFileUtilsCountMatchesPost(
    requestBody: CountMatchesInput
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/utils/count-matches/",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Get Folios For File
   * Returns number of folios (TIB) / facsimiles (CHN) /
   * suttas/PTS nrs/segments (PLI) / segments (SKT)
   * @param fileName File name of the text for which folios should be fetched.
   * @returns any Successful Response
   * @throws ApiError
   */
  public static getFoliosForFileUtilsFoliosGet(
    fileName: string
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/utils/folios/",
      query: {
        file_name: fileName,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Tag Sanskrit
   * Stemming + Tagging for Sanskrit
   * :return: String with tagged Sanskrit
   * @param sanskritString Sanskrit string to be tagged.
   * @returns any Successful Response
   * @throws ApiError
   */
  public static tagSanskritUtilsSanskrittaggerGet(
    sanskritString: string
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/utils/sanskrittagger/",
      query: {
        sanskrit_string: sanskritString,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Get Multilingual
   * Returns a list of the available languages of matches for the given file.
   * @param fileName File name of the text for which the available languages should be fetched.
   * @returns any Successful Response
   * @throws ApiError
   */
  public static getMultilingualUtilsAvailableLanguagesGet(
    fileName: string
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/utils/available-languages/",
      query: {
        file_name: fileName,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Get Files For Menu
   * Endpoint that returns list of file IDs in a given language or
   * all files available in multilang if the language is multi.
   * @param language language to be used
   * @returns any Successful Response
   * @throws ApiError
   */
  public static getFilesForMenuMenusFilesGet(
    language: string
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/menus/files/",
      query: {
        language: language,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Get Files For Filter Menu
   * Given a language, return list of files for the category menu
   * @param language language to be used
   * @returns any Successful Response
   * @throws ApiError
   */
  public static getFilesForFilterMenuMenusFilterGet(
    language: string
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/menus/filter/",
      query: {
        language: language,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Get Categories For Filter Menu
   * Given a language, return list of categories for the filter menu
   * @param language language to be used
   * @returns any Successful Response
   * @throws ApiError
   */
  public static getCategoriesForFilterMenuMenusCategoryGet(
    language: string
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/menus/category/",
      query: {
        language: language,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Get All Collections
   * Returns list of all available collections.
   * @returns any Successful Response
   * @throws ApiError
   */
  public static getAllCollectionsMenusCollectionsGet(): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/menus/collections/",
    });
  }

  /**
   * Get Data For Sidebar Menu
   * Endpoint for sidebar menu
   * @param language language to be used
   * @returns any Successful Response
   * @throws ApiError
   */
  public static getDataForSidebarMenuMenusSidebarGet(
    language: string
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/menus/sidebar/",
      query: {
        language: language,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Root
   * Root API endpoint
   * :return: The response (json object)
   * @returns any Successful Response
   * @throws ApiError
   */
  public static rootGet(): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/",
    });
  }
}
