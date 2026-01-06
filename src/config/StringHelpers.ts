export default class StringHelpers {
  static baseURL: string | undefined = process.env.NEXT_PUBLIC_NEST_BASE_URI;

  static getProfile = (data: any, code?: string | number) => {
    return `${StringHelpers.baseURL}/${data?.attachmentType}/${data?.fileName || code}${data?.ext}`;
  };
}
