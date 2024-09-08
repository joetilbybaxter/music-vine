// Interface representing the document structure
export interface Document {
    id: string;
    name: string;
    [key: string]: any;
  }
  
  // Class representing a single search result
  export class Result {
    document: Document;
  
    constructor(document: Document) {
      this.document = document;
    }
  }
  
  export const mapResults = (apiResponse: any[]): Result[] => {
    return apiResponse.map((item) => new Result(item.document));
  };
  