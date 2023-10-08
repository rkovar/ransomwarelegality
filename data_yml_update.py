import yaml
import json

# For merged-data.geojson
def find_id_by_name(country_name, geojson_file="merged-data.geojson"):
    """Find the id of a country by its name from the geojson data."""
    
    with open(geojson_file, 'r') as file:
        geojson_data = json.load(file)
    
    for feature in geojson_data.get("features", []):
        if feature["properties"]["name"] == country_name:
            return feature["id"]

    return None

def get_input():
    """Get user input for the country and its attributes."""
    country_name = input("Enter the country name (e.g., Afghanistan): ")
    country_id = find_id_by_name(country_name)
    
    if not country_id:
        print("You didn't spell something right. Please try again.")
        return None

    color = input(f"Enter the color for {country_name}: ")
    info = input(f"Enter the info for {country_name}: ")
    citation = input(f"Enter the citation for {country_name}: ")
    
    return {country_id: {"color": color, "info": info, "citation": citation}}

def add_to_yaml(file_name, new_data):
    """Add new data to the YAML file."""
    if not new_data:
        return

    with open(file_name, 'r') as file:
        data = yaml.safe_load(file) or {}  # Load existing data or initialize an empty dict
    
    data.update(new_data)

    with open(file_name, 'w') as file:
        yaml.dump(data, file, default_flow_style=False, allow_unicode=True)

def main():
    while True:
        file_name = "data.yml"
        new_data = get_input()

        if new_data:
            country_id = list(new_data.keys())[0]
            add_to_yaml(file_name, new_data)
            print(f"{file_name} has been updated with the new data for country ID {country_id}!")
            break
        
        retry = input("Would you like to try again? (yes/no): ").strip().lower()
        if retry != "yes":
            break

if __name__ == "__main__":
    main()
