mapboxgl.accessToken = 'pk.eyJ1Ijoicm93YW5pbmdzIiwiYSI6ImNscnpndW9vbzIwMnIycnJ6bjU0b21zdjUifQ.IQhkRR83s0pszHSSlAm4Fw';
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [34.3929, 31.4500],
        zoom: 10
    });

    map.on('load', () => {
        map.addSource('places', {
            'type': 'geojson',
            'data': {
                'type': 'FeatureCollection',
                'features': [
                    {
                        'type': 'Feature',
                        'properties': {
                            'description':
                                '<strong>Bureij Refugee Camp</strong><p>Hassouneh Salim, Sari Mansour</p>'
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [34.4024, 31.4388]
                        }
                    },
                    {
                        'type': 'Feature',
                        'properties': {
                            'description':
                                '<strong>Zeitoun</strong><p>Bilal Jadallah</p>'
   
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [34.4497, 31.5184]
                        }
                    },
                    {
                        'type': 'Feature',
                        'properties': {
                            'description':
                                '<strong>Rafah</strong><p>Mohammad Jarghoun, killed October 7, 2023</p>'
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [34.2435, 31.2968]
                        }
                    },
                    {
                        'type': 'Feature',
                        'properties': {
                            'description':
                                '<strong>Sheik Ijlin</strong><p>Assaad Shamlakh, killed October 8, 2023</p>'
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [34.4281, 31.5133]
                        }
                    },
                    {
                        'type': 'Feature',
                        'properties': {
                            'description':
                                "<strong>Zawaida</strong><p>Mohamed Yaghi, killed February 23 2024</p>"
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [34.3707, 31.4298]
                        }
                    },
                    {
                        'type': 'Feature',
                        'properties': {
                            'description':
                                '<strong>Al Nusrat Camp</strong><p>Zayd Abu Zayed killed February 15 2024</p>'
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [34.3928, 31.4480]
                        }
                    },
                    {
                        'type': 'Feature',
                        'properties': {
                            'description':
                                '<strong>Al Geneina, Rafah</strong><p>Alaa Al-Hams, killed February 12 2024</p>'
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [34.2435, 31.3200]
                        }
                    },
                    {
                        'type': 'Feature',
                        'properties': {
                            'description':
                                "<strong>Jabalia City</strong><p>Angam Ahmad Edwan, killed February 12 2024</p>"
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [34.4797, 31.5294]
                        }
                    },
                    {
                        'type': 'Feature',
                        'properties': {
                            'description':
                                '<strong>Nasser Hospital</strong><p>Yasser Mamdouh El-Fady killed February 11 2024</p>'
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [34.2931, 31.3480]
                        }
                    },
                    {
                        'type': 'Feature',
                        'properties': {
                            'description':
                                '<strong>Deir al-Balah</strong><p>Nafez Abdel Jawad killed February 8 2024</p>'
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [34.3509, 31.4171]
                        }
                    },
                    {
                        'type': 'Feature',
                        'properties': {
                            'description':
                                '<strong>Al Amal neighbourhood, Khan Yunis</strong><p>Rizq Al-Gharabli killed February 6 2024</p>'
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [34.2987, 31.3515]
                        }
                    },
                    {
                        'type': 'Feature',
                        'properties': {
                            'description':
                                '<strong>Al Shati Camp</strong><p>Mohammed Atallah killed January 19 2024</p>'
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [34.4536, 31.5374]
                        }
                    },
                    {
                        'type': 'Feature',
                        'properties': {
                            'description':
                                '<strong>Nuseirat camp</strong><p>Iyad El-Ruwagh killed January 25 2024</p>'
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [34.3929, 31.4516]
                        }
                    },
                    {
                        'type': 'Feature',
                        'properties': {
                            'description':
                                '<strong>Beit Hanoun</strong><p>Yazan al-Zuweidi killed January 14 2024</p>'
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [34.5371, 31.5407]
                        }
                    },
                    {
                        'type': 'Feature',
                        'properties': {
                            'description':
                                '<strong>At Home in the Southern Gaza Strip</strong><p>Mohamed Jamal Sobhi Al-Thalathini killed January 11 2022</p>'
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [34.2987, 31.4515]
                        }
                    },
                    {
                        'type': 'Feature',
                        'properties': {
                            'description':
                                '<strong>Example Marker 1</strong><p>Details for Marker 1</p>'
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [34.45, 31.4]
                        }
                    },
                    {
                        'type': 'Feature',
                        'properties': {
                            'description':
                                '<strong>Example Marker 2</strong><p>Details for Marker 2</p>'
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [34.35, 31.55]
                        }
                    },
            
                ]
            }
        });

        console.log('Adding layer...'); // print out successfully

        // Add a layer showing the places.
        map.addLayer({
            'id': 'places',
            'type': 'circle',
            'source': 'places',
            'paint': {
                'circle-color': '#4264fb',
                'circle-radius': 4,
                'circle-stroke-width': 1,
                'circle-stroke-color': '#4264fb'
            }
        });

        // Create a popup, but don't add it to the map yet.
        const popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false
        });

        map.on('mouseenter', 'places', (e) => {
            // Change the cursor style as a UI indicator.
            map.getCanvas().style.cursor = 'pointer';

            console.log('mouseenter event triggered');
            console.log('e.features:', e.features);
            console.log('e.lngLat:', e.lngLat);

            // Copy coordinates array.
            const coordinates = e.features[0].geometry.coordinates.slice();
            const description = e.features[0].properties.description;

            // Ensure that if the map is zoomed out such that multiple
            // copies of the feature are visible, the popup appears
            // over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            // Populate the popup and set its coordinates
            // based on the feature found.
            popup.setLngLat(coordinates).setHTML(description).addTo(map);
        });

        map.on('mouseleave', 'places', () => {
            map.getCanvas().style.cursor = '';
            popup.remove();
        });
    });