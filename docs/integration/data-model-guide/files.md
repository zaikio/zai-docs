# Data Model Guide: Files

[[toc]]

## Introduction

Almost every conceivable print Job requires, at some point, files that, for example, contain the
content to be printed, or that describe how to apply finishings to the Job. In the Zaikio platform,
these files are represented as `FileReference` objects - pointers to a file. These could be stored
on local network shares, on web servers, in the cloud or even using our purpose-built Zaikio Vault
storage solution.

## Types of storage

The Zaikio platform does not attempt to tell you where files should be stored, but it does require
them to be addressable through a URI, or Uniform Resource Identifier. These are things like URLs to
files stored on web servers `https://...` or to files stored on local networks `smb://...`. Our key
advice though is that to make the most out of the platform, they need to be stored at a location where
connected applications can access them. This can bring problems of security and auditing along with
all the associated headaches.

We have built Zaikio Vault to solve these, and the platform integrates seamlessly with it. Secure,
encrypted cloud storage backed by Amazon S3 (the world's largest storage system) that integrates
directly into Zaikio workspaces, providing one-click access control and auditing, managed security
and true global scalability.

We'll cover the differences in a FileReference between generic storage and Vault storage below.

## The basic model

### Generic Files

Generic FileReferences could not be simpler. At core it is just a kind (e.g. is this artwork or a path), a URL,
a mime-type (or definition of what type of data is being stored) and the size of the file.

```json
{
  "kind": "artwork",
  "mime_type": "application/pdf",
  "url": "https://www.dropbox.com/scl/fi/alee5ik58onyi08af3h8n/sample-business-card.pdf?rlkey=ezfzqpp6t3bqn86guxq84ykwk&dl=1",
  "size": 636000 // the size in bytes
}
```

### Vault File references

Vault FileReference objects are even simpler again. They simply require the kind, and then the
ID of the Vault and File within the vault. All other fields are automatically populated from
the metadata stored by Vault.

It is important to say that at no point can the Zaikio platform read the data stored by Vault,
only the metadata attached to it. Only access granted with the `vault.files.r` scope can retrieve
the files stored within a Vault.

#### Creating a file reference

```json
{
  "kind": "artwork",
  "vault_id": "4406fdac-6086-445c-abb7-e308362b4e53",
  "vault_file_id": "fe3aa724-e512-4594-9aa1-8f24d9ad0cc5"
}
```

#### The populated object after creation

```json
{
  "kind": "artwork",
  "vault_id": "4406fdac-6086-445c-abb7-e308362b4e53",
  "vault_file_id": "fe3aa724-e512-4594-9aa1-8f24d9ad0cc5",
  "mime_type": "application/pdf", // auto-populated
  "url": "https://vault.zaikio.com/vaults/:vault_id/files/:file_id", // auto-populated
  "size": 636000 // auto-populated
}
```

## Attaching files to resources

FileReferences can be attached to many resources within the platform.

```yaml
scopes:
- zaikio.jobs.rw
```

### Part

FileReference objects can be attached to a Part in two ways:

1. Through the fully-hydrated object creation endpoint of a Job (`POST /api/v1/jobs`) as can be [seen here](/integration/data-model-guide/job.html#adding-print-data-files)
2. Through the individual part endpoints (`POST /api/v1/jobs/:id/parts` or `PATCH /api/v1/parts/:id`) within a Job for [creating new parts](/api/data_platform/zaikio.html#/Jobs/post_jobs__job_id__parts) or [updating existing ones](/api/data_platform/zaikio.html#/Jobs/patch_parts__part_id_)

FileReference objects added to a Part should be of kind `"artwork"`.

### Finishing

FileReference objects can be attached to a Finishing in three ways:

1. Through the fully-hydrated object creation endpoint of a Job (`POST /api/v1/jobs`) as can be [seen here](/integration/data-model-guide/job.html#adding-print-data-files)
2. Through the individual Part endpoints (`POST /api/v1/jobs/:id/parts` or `PATCH /api/v1/parts/:id`) within a Job for [creating new parts](/api/data_platform/zaikio.html#/Jobs/post_jobs__job_id__parts) or [updating existing ones](/api/data_platform/zaikio.html#/Jobs/patch_parts__part_id_)
3. By directly [creating a FileReference for a Finishing](/api/data_platform/zaikio.html#/Jobs/post_finishings__finishing_id__file_references) with `POST /api/v1/finishings/:id/file_references`

Depending on the finishing, FileReferences attached to Finishing objects might be of kind `"artwork"` or
of kind `"path"`

### Signature

FileReference objects can be attached to a Signature using the [dedicated endpoint](/api/data_platform/zaikio.html#/Jobs/post_signatures__signature_id__file_references)
at `POST /signatures/:id/file_references`.

FileReference objects attached to Signatures should be of kind `"signature"`.

## Working with files

Many applications that need to interact with files should subscribe to our event notifications
for FileReferences being added to the platform.

### Event

**zaikio.file_reference_added** will be fired every time a new FileReference is created,
and should be considered the correct event to listen to in order to perform actions such
as preflighting.

If an application wants to perform tasks which depend on other data existing, then they should
consider listening in to status triggers on the Job. An example for this would be performing
colour correction on all the files in a Job once it has been scheduled to a machine for print.

```json
{
  "payload": {
    "file_reference_id": "276e768e-f9c3-44f8-ac6a-75f6bdcb1a21",
    "referenceable_id": "14205f53-1c5e-4642-9a05-7982e007bea9",
    "referenceable_type": "Part",
    "mime_type": "application/pdf",
    "kind": "artwork"
  }
}
```

## Acting upon files - Operations

An Operation can be created when an app starts processing a file. Operations represent a
task being performed, and can be updated with progress to communicate to other apps and end users
what is happening.

### Authorization

Operations depart from our standard permissions model in that only the application that created
an Operation can update that record, or create Remark objects for it.

### Payloads

`POST /api/v1/file_references/:id/operations`

```json
{
  "operation": {
    "status": "pending",
    "progress": 0
  }
}
```

`PATCH /api/v1/operations/:id`

```json
{
  "operation": {
    "status": "completed",
    "progress": 1
  }
}
```

When an operation is processing or has completed, the calling application can attach Remark objects to
it, to describe outcomes that happened.

`POST /api/v1/operations/:id/remarks`

```json
{
  "remark": {
    // one of info, warning, error or fix
    "severity": "warning",
    "kind": "color_mismatch",
    "message": "There was an issue with your colours",
    // A reference to the area the issue is found in. There is no standard
    // for this, so should be provided in a way that is simple for an end-user
    // to understand
    "area": "Page 1, top left",
    // How many times the issue appears
    "repeats_in_area": 5
  }
}
```
