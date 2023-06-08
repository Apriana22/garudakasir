
---
### Object POST Gift
```
{
    "name": "Nama gift",
    "description": "deskripsi ",
    "poins": 130000,
    "hot_item": 0,
    "new": 0,
    "best_seller": 0,
    "available": 1
}
```
### Object PUT Gift
```
{
    "name": "Nama gift",
    "description": "deskripsi ",
    "poins": 130000,
    "hot_item": 0,
    "new": 0,
    "best_seller": 0,
    "available": 1
}
```
### Array Object Redeem
```
{
    "redeem": {
        "redeem_code": "A-XX124",
        "quantity_total": 2,
        "poin_total": 30000
    },
    "redeemDetails": [    
        {
            "gift_id": 6,
            "quantity": 4,
            "poins": 10000
        },
        {
            "gift_id": 5,
            "quantity": 3,
            "poins": 20000
        }
    ]
}
```

### Object Rating
```
{
    "gift_id": 6,
    "redeem_detail_id": 19,
    "rating": 4
}
```

### Array Object Stok
```
[
    {
        "gift_id":6,
        "quantity":10
    },
    {
        "gift_id":5,
        "quantity":10
    },
    {
        "gift_id":9,
        "quantity":10
    }
]
```