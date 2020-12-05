import { render } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("fetches leaflet map on start", () => {
    const fetchMock = jest.fn();
    fetchMock.mockImplementation(() => {
      return {
        then: () => ({
          then: (callback) =>
            // Return MapContainer and TileLayer?
            // callback([{  }]),
        }),
      };
    });

    const { getAllByText } = render(<App fetchMethod={fetchMock} />);

    expect(fetchMock).toHaveBeenCalledWith("http://localhost:3000");
  });
});
