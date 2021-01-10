package com.hamster.website;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Document(collection="jokes")
public class Joke {
    @Id
    public String _id;

    public String posterId;

    public String title;

    public String content;

    public Date createdAt;

    public List<String> upvotersIDs;

    public List<String> awardersIDs;

    public List<String> tags;

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public List<String> getTags() {
        return tags;
    }

    @Override
    public String toString() {
        return "Joke{" +
                "_id='" + _id + '\'' +
                ", posterId='" + posterId + '\'' +
                ", title='" + title + '\'' +
                ", content='" + content + '\'' +
                ", createdAt=" + createdAt +
                ", upvotersIDs=" + upvotersIDs +
                ", awardersIDs=" + awardersIDs +
                ", tags=" + tags +
                '}';
    }

    public Joke(String _id, String posterId, String title, String content, Date createdAt, List<String> upvotersIDs, List<String> awardersIDs, List<String> tags) {
        this._id = _id;
        this.posterId = posterId;
        this.title = title;
        this.content = content;
        this.createdAt = createdAt;
        this.upvotersIDs = upvotersIDs;
        this.awardersIDs = awardersIDs;
        this.tags = tags;
    }

    public Joke() {
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getPosterId() {
        return posterId;
    }

    public void setPosterId(String posterId) {
        this.posterId = posterId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public List<String> getUpvotersIDs() {
        return upvotersIDs;
    }

    public void setUpvotersIDs(List<String> upvotersIDs) {
        this.upvotersIDs = upvotersIDs;
    }

    public List<String> getAwardersIDs() {
        return awardersIDs;
    }

    public void setAwardersIDs(List<String> awardersIDs) {
        this.awardersIDs = awardersIDs;
    }

    public List<String> getJokeIds() {
        return tags;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Joke joke = (Joke) o;
        return Objects.equals(_id, joke._id) &&
                Objects.equals(posterId, joke.posterId) &&
                Objects.equals(title, joke.title) &&
                Objects.equals(content, joke.content) &&
                Objects.equals(upvotersIDs, joke.upvotersIDs) &&
                Objects.equals(awardersIDs, joke.awardersIDs) &&
                Objects.equals(tags, joke.tags);
    }

    @Override
    public int hashCode() {
        return Objects.hash(_id, posterId, title, content, upvotersIDs, awardersIDs, tags);
    }

}
