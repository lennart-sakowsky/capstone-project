describe("Move map", () => {
  it("should move map by dragging", () => {
    cy.visit("http://localhost:3000");
    // wait for data
    cy.get(".leaflet-interactive.multilinestring");
    // simulate map moving
    cy.get(".leaflet-container")
      .trigger("mousedown", "center")
      .trigger("mousemove", 10, 10)
      .trigger("mouseup");
    // map should be loading
    cy.get(".leaflet-container.leaflet-loading");
  });
});
