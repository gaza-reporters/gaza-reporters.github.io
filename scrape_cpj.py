import json
import time
from pathlib import Path

import requests


def main(throttle):
    data_exists = True
    page_num = 1
    while data_exists:
        data = scrape(page_num)
        if data["data"]:
            # Write data to file
            write_json(data, page_num)
            # Increment page
            page_num += 1
            time.sleep(throttle)
        else:
            print(f"No data found on page {page_num}. Exiting")
            data_exists = False


def scrape(page_num):
    print("Scraping CPJ data...")
    #Example URL for *all* data
    # url = "https://datamanager.cpj.org/api/datamanager/reports/entries?distinct(personId)=&includes=organizations,fullName,location,status,typeOfDeath,charges,startDisplay,mtpage,country,type,motiveConfirmed&sort=fullName&pageNum=1&pageSize=20&in(status,'Killed')=&or(eq(type,"media worker"),in(motiveConfirmed,'Confirmed','Unconfirmed'))=&in(type,'Journalist','Media Worker')=&ge(year,1992)=&le(year,2024)="
    params = {
        'distinct(personId)': '',
        'includes': 'organizations,fullName,location,status,typeOfDeath,charges,startDisplay,mtpage,country,type,motiveConfirmed',
        'sort': 'fullName',
        'pageNum': page_num,
        'pageSize': 20,
        "in(status,'Killed')": '',
        "or(eq(type,'media worker'),in(motiveConfirmed,'Confirmed','Unconfirmed'))":'',
        "in(type,'Journalist','Media Worker')":'',
        "ge(year,1992)": '',
        "le(year,2024)": '',
    }
    base_url = "https://datamanager.cpj.org/api/datamanager/reports/entries"
    response = requests.get(base_url, params=params)
    data = response.json()
    return data


def write_json(data, page_num):
    outdir = Path("data")
    outdir.mkdir(parents=True, exist_ok=True)
    outfile = outdir.joinpath(f'cpj_{page_num}.json')
    print(f"Writing {outfile}")
    with open(outfile, 'w') as outfile:
        json.dump(data, outfile, indent=4)


if __name__ == "__main__":
    # Throttle in seconds between requests
    throttle = 1
    main(throttle)
