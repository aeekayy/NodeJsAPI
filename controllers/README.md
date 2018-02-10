# API Description

## Login
POST /api/v1/user/login
Fields: 
* username
* password

Return
200: 
```{
    "id": "cf564378-7304-4a6b-afc0-caf3ea68b2f7",
    "username": "aeekay",
    "expiration": "2017-11-17T11:52:05.645Z",
    "createdAt": "2017-11-17T05:52:05.651Z",
    "updatedAt": "2017-11-17T05:52:05.651Z"
}
```

400: Error

## Create Profile (Stage Manager vs Production Manager)
POST /api/v1/profile/create
Fields:
* organization_name
* organization_description
* organization_address_1
* organization_address_2
* organization_city
* organization_state
* organization_zip 
* organization_type (production or stage) 

Return
200
```{
    "id": "7f41e285-63ac-42cb-be93-a3c9dca53edd",
    "organization_name": "Dummy Stage 2",
    "organization_description": "The quick brown fox jumps over the lazy dog. ",
    "organization_address_1": "2250 Vanguard Way",
    "organization_address_2": null,
    "organization_city": "Costa Mesa",
    "organization_state": "CA",
    "organization_zip": "92626",
    "organization_type": "production",
    "updatedAt": "2017-11-17T06:43:44.721Z",
    "createdAt": "2017-11-17T06:43:44.721Z",
    "organization_coordinate": {
        "type": "Point",
        "coordinates": [
            33.658408,
            -117.903563
        ]
    },
    "organization_map_data": {
        "formattedAddress": "2250 Vanguard Way, Costa Mesa, CA 92626, USA",
        "latitude": 33.658408,
        "longitude": -117.903563,
        "extra": {
            "googlePlaceId": "ChIJI-9K2J_f3IARxS9ywB_s6XM",
            "confidence": 1,
            "premise": null,
            "subpremise": null,
            "neighborhood": "Costa Mesa",
            "establishment": null
        },
        "administrativeLevels": {
            "level2long": "Orange County",
            "level2short": "Orange County",
            "level1long": "California",
            "level1short": "CA"
        },
        "streetNumber": "2250",
        "streetName": "Vanguard Way",
        "city": "Costa Mesa",
        "country": "United States",
        "countryCode": "US",
        "zipcode": "92626",
        "provider": "google"
    },
    "organization_rate_per_hour": null,
    "organization_fix_rate": null,
    "organization_hours": null
}
```

400: Error


## Get Profile 
GET /api/v1/profile/7f41e285-63ac-42cb-be93-a3c9dca53edd

Return: 
200
```{
    "id": "7f41e285-63ac-42cb-be93-a3c9dca53edd",
    "organization_name": "Dummy Stage 2",
    "organization_address_1": "2250 Vanguard Way",
    "organization_address_2": null,
    "organization_city": "Costa Mesa",
    "organization_state": "CA",
    "organization_zip": "92626",
    "organization_type": "production",
    "organization_coordinate": {
        "type": "Point",
        "coordinates": [
            33.658408,
            -117.903563
        ]
    },
    "organization_description": "The quick brown fox jumps over the lazy dog. ",
    "organization_map_data": {
        "formattedAddress": "2250 Vanguard Way, Costa Mesa, CA 92626, USA",
        "latitude": 33.658408,
        "longitude": -117.903563,
        "extra": {
            "googlePlaceId": "ChIJI-9K2J_f3IARxS9ywB_s6XM",
            "confidence": 1,
            "premise": null,
            "subpremise": null,
            "neighborhood": "Costa Mesa",
            "establishment": null
        },
        "administrativeLevels": {
            "level2long": "Orange County",
            "level2short": "Orange County",
            "level1long": "California",
            "level1short": "CA"
        },
        "streetNumber": "2250",
        "streetName": "Vanguard Way",
        "city": "Costa Mesa",
        "country": "United States",
        "countryCode": "US",
        "zipcode": "92626",
        "provider": "google"
    },
    "createdAt": "2017-11-17T06:43:44.721Z",
    "updatedAt": "2017-11-17T06:43:44.721Z"
}
```

400: Not Found
