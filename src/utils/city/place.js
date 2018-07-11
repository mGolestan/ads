class Place {
  constructor(
    id,
    parentId,
    name,
    slug,
    level,
    ordering,
    lat,
    long,
    radius,
    showInFilter,
    showInInput,
    neighbours,
    isNew
  ) {
    this.id = id;
    this.parentId = parentId;
    this.name = name;
    this.slug = slug;
    this.level = level;
    this.ordering = ordering;
    this.lat = lat;
    this.long = long;
    this.radius = radius;
    this.showInFilter = showInFilter;
    this.showInInput = showInInput;
    this.neighbours = neighbours;
    this.isNew = isNew;
  }

  parent() {
    return this.parentId in Place.PLACES ? Place.PLACES[this.parentId] : null;
  }

  children() {
    return Place.PLACES.filter(
      place =>
        (place.parentId === this.id && place.level === "place4") ||
        (place.parent() &&
          place.parent().level === "place3" &&
          place.parent().parentId === this.id)
    ).sort((p1, p2) => p1.ordering < p2.ordering);
  }

  static findById(place2, place4) {
    const places = [];
    if (place2 && place2 in Place.PLACES) {
      places.push(Place.PLACES[place2]);
    }
    if (place4 && place4 in Place.PLACES) {
      places.push(Place.PLACES[place4]);
    }
    return places;
  }

  static findByCitySlug(slug) {
    return Place.PLACES.filter(place => place.slug === slug)[0];
  }
}

export default Place;
