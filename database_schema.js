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

const addItem = {
  track:
    "INSERT INTO tracks\
      (id, album, artists, explicit, name, popularity, acousticness, analysis_url,\
        danceability, duration_ms, energy, instrumentalness, key, liveness, loudness,\
        mode, speechiness, tempo, time_signature, valence)\
      VALUES\
      ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20)\
      ON CONFLICT (id) DO UPDATE SET\
        album = excluded.album,\
        artists = excluded.artists,\
        explicit = excluded.explicit,\
        name = excluded.name,\
        popularity = excluded.popularity,\
        acousticness = excluded.acousticness,\
        analysis_url = excluded.analysis_url,\
        danceability = excluded.danceability,\
        duration_ms = excluded.duration_ms,\
        energy = excluded.energy,\
        instrumentalness = excluded.instrumentalness,\
        key = excluded.key,\
        liveness = excluded.liveness,\
        loudness = excluded.loudness,\
        mode = excluded.mode,\
        speechiness = excluded.speechiness,\
        tempo = excluded.tempo,\
        time_signature = excluded.time_signature,\
        valence = excluded.valence"
}

module.exports = { setup, addItem };
