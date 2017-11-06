// An array of SQL statements setting up the database
const setup = [
  'CREATE TABLE IF NOT EXISTS Users( \
    username TEXT, \
    PRIMARY KEY (username) )',
  'CREATE TABLE IF NOT EXISTS Playlists( \
    id TEXT, \
    name TEXT, \
    owner TEXT REFERENCES Users(username) ON DELETE CASCADE, \
    PRIMARY KEY (id) )',
  'CREATE TABLE IF NOT EXISTS Tracks( \
    id TEXT, \
    album TEXT, \
    artists TEXT, \
    explicit BOOLEAN, \
    name TEXT, \
    popularity INT, \
    acousticness REAL, \
    analysis_url TEXT, \
    danceability REAL, \
    duration_ms REAL, \
    energy REAL, \
    instrumentalness REAL, \
    key INT, \
    liveness REAL, \
    loudness REAL, \
    mode INT, \
    speechiness REAL, \
    tempo REAL, \
    time_signature INT, \
    valence REAL, \
    PRIMARY KEY (id) )',
  'CREATE TABLE IF NOT EXISTS Playlist_Has( \
    playlist_id TEXT REFERENCES Playlists(id), \
    track_id TEXT REFERENCES Tracks(id), \
    added_at TIMESTAMP, \
    added_by TEXT, \
    PRIMARY KEY (playlist_id, track_id, added_at) )'
]

module.exports = { setup };
