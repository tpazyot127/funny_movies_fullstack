import { renderHook } from "@testing-library/react-hooks";
import { useDispatch } from "react-redux";
import { useUserActions } from "../useActions";
import { UserActionCreators } from "../../redux";
import { bindActionCreators } from "redux";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

describe("useUserActions", () => {
  const dispatchMock = jest.fn();

  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(dispatchMock);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("returns bound user action creators", () => {
    let result;
    result = renderHook(() => useUserActions()).result;
    expect(result).toEqual(
      bindActionCreators(UserActionCreators, dispatchMock)
    );
  });
});
