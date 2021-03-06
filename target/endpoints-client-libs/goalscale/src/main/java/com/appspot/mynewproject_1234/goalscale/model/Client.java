/*
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 */
/*
 * This code was generated by https://code.google.com/p/google-apis-client-generator/
 * (build: 2015-03-26 20:30:19 UTC)
 * on 2015-06-23 at 12:56:49 UTC 
 * Modify at your own risk.
 */

package com.appspot.mynewproject_1234.goalscale.model;

/**
 * Model definition for Client.
 *
 * <p> This is the Java data model class that specifies how to parse/serialize into the JSON that is
 * transmitted over HTTP when working with the goalscale. For a detailed explanation see:
 * <a href="http://code.google.com/p/google-http-java-client/wiki/JSON">http://code.google.com/p/google-http-java-client/wiki/JSON</a>
 * </p>
 *
 * @author Google, Inc.
 */
@SuppressWarnings("javadoc")
public final class Client extends com.google.api.client.json.GenericJson {

  /**
   * The value may be {@code null}.
   */
  @com.google.api.client.util.Key
  private java.lang.Integer age;

  /**
   * The value may be {@code null}.
   */
  @com.google.api.client.util.Key
  private java.lang.String description;

  /**
   * The value may be {@code null}.
   */
  @com.google.api.client.util.Key
  private java.lang.String displayName;

  /**
   * The value may be {@code null}.
   */
  @com.google.api.client.util.Key
  private java.util.List<Goal> goals;

  static {
    // hack to force ProGuard to consider Goal used, since otherwise it would be stripped out
    // see http://code.google.com/p/google-api-java-client/issues/detail?id=528
    com.google.api.client.util.Data.nullOf(Goal.class);
  }

  /**
   * The value may be {@code null}.
   */
  @com.google.api.client.util.Key
  private java.lang.String goalsetterid;

  /**
   * The value may be {@code null}.
   */
  @com.google.api.client.util.Key
  private java.lang.String id;

  /**
   * The value may be {@code null}.
   */
  @com.google.api.client.util.Key
  private java.lang.String location;

  /**
   * The value may be {@code null}.
   */
  @com.google.api.client.util.Key
  private java.lang.Integer medicalRecordNumber;

  /**
   * The value may be {@code null}.
   */
  @com.google.api.client.util.Key
  private java.lang.String name;

  /**
   * The value may be {@code null}.
   */
  @com.google.api.client.util.Key
  private java.lang.String organizerDisplayName;

  /**
   * The value may be {@code null}.
   */
  @com.google.api.client.util.Key
  private java.lang.String websafeKey;

  /**
   * @return value or {@code null} for none
   */
  public java.lang.Integer getAge() {
    return age;
  }

  /**
   * @param age age or {@code null} for none
   */
  public Client setAge(java.lang.Integer age) {
    this.age = age;
    return this;
  }

  /**
   * @return value or {@code null} for none
   */
  public java.lang.String getDescription() {
    return description;
  }

  /**
   * @param description description or {@code null} for none
   */
  public Client setDescription(java.lang.String description) {
    this.description = description;
    return this;
  }

  /**
   * @return value or {@code null} for none
   */
  public java.lang.String getDisplayName() {
    return displayName;
  }

  /**
   * @param displayName displayName or {@code null} for none
   */
  public Client setDisplayName(java.lang.String displayName) {
    this.displayName = displayName;
    return this;
  }

  /**
   * @return value or {@code null} for none
   */
  public java.util.List<Goal> getGoals() {
    return goals;
  }

  /**
   * @param goals goals or {@code null} for none
   */
  public Client setGoals(java.util.List<Goal> goals) {
    this.goals = goals;
    return this;
  }

  /**
   * @return value or {@code null} for none
   */
  public java.lang.String getGoalsetterid() {
    return goalsetterid;
  }

  /**
   * @param goalsetterid goalsetterid or {@code null} for none
   */
  public Client setGoalsetterid(java.lang.String goalsetterid) {
    this.goalsetterid = goalsetterid;
    return this;
  }

  /**
   * @return value or {@code null} for none
   */
  public java.lang.String getId() {
    return id;
  }

  /**
   * @param id id or {@code null} for none
   */
  public Client setId(java.lang.String id) {
    this.id = id;
    return this;
  }

  /**
   * @return value or {@code null} for none
   */
  public java.lang.String getLocation() {
    return location;
  }

  /**
   * @param location location or {@code null} for none
   */
  public Client setLocation(java.lang.String location) {
    this.location = location;
    return this;
  }

  /**
   * @return value or {@code null} for none
   */
  public java.lang.Integer getMedicalRecordNumber() {
    return medicalRecordNumber;
  }

  /**
   * @param medicalRecordNumber medicalRecordNumber or {@code null} for none
   */
  public Client setMedicalRecordNumber(java.lang.Integer medicalRecordNumber) {
    this.medicalRecordNumber = medicalRecordNumber;
    return this;
  }

  /**
   * @return value or {@code null} for none
   */
  public java.lang.String getName() {
    return name;
  }

  /**
   * @param name name or {@code null} for none
   */
  public Client setName(java.lang.String name) {
    this.name = name;
    return this;
  }

  /**
   * @return value or {@code null} for none
   */
  public java.lang.String getOrganizerDisplayName() {
    return organizerDisplayName;
  }

  /**
   * @param organizerDisplayName organizerDisplayName or {@code null} for none
   */
  public Client setOrganizerDisplayName(java.lang.String organizerDisplayName) {
    this.organizerDisplayName = organizerDisplayName;
    return this;
  }

  /**
   * @return value or {@code null} for none
   */
  public java.lang.String getWebsafeKey() {
    return websafeKey;
  }

  /**
   * @param websafeKey websafeKey or {@code null} for none
   */
  public Client setWebsafeKey(java.lang.String websafeKey) {
    this.websafeKey = websafeKey;
    return this;
  }

  @Override
  public Client set(String fieldName, Object value) {
    return (Client) super.set(fieldName, value);
  }

  @Override
  public Client clone() {
    return (Client) super.clone();
  }

}
