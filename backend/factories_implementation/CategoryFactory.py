from entities.Category import Category


def create_category(data: dict) -> Category:
    name = data.get('name')
    return Category(name=name)
