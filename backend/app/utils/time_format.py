from datetime import datetime, timezone, timedelta

def validate_isoformat(dt: datetime):
    if isinstance(dt, datetime):
        return True
    else:
        return False

# Get current time in Taiwan timezone (UTC+8)
def get_current_tw_time():
    tz_tw = datetime.now(timezone(timedelta(hours=8)))
    return tz_tw.replace(tzinfo=None)