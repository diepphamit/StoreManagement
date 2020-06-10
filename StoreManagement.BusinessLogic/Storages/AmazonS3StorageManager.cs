using Amazon;
using Amazon.S3;
using Amazon.S3.Model;
using Amazon.S3.Transfer;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Options;
using StoreManagement.BusinessLogic.Helper;
using StoreManagement.DataAccess.Entites;
using Amazon.CloudFront;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace StoreManagement.BusinessLogic.Storages
{
    public class AmazonS3StorageManager : IAmazonS3StorageManager
    {
        private readonly IAmazonS3 _client;
        private readonly AmazonStorageSetting _s3Options;
        private readonly AmazonCloudFront _cloudFrontOptions;
        //private readonly IDistributedCache _distributedCache;

        public AmazonS3StorageManager(
            IOptionsMonitor<AmazonStorageSetting> s3OptionsAccessor,
            IOptionsMonitor<AmazonCloudFront> cloudfrontOptionsAccessor)
        {
            _s3Options = s3OptionsAccessor.CurrentValue;
            _cloudFrontOptions = cloudfrontOptionsAccessor.CurrentValue;
            _client = new AmazonS3Client(_s3Options.AccessKeyID, _s3Options.SecretAccessKey, RegionEndpoint.GetBySystemName(_s3Options.RegionEndpoint));
           // _distributedCache = distributedCache;
        }

        public void Create(Picture fileEntry, MemoryStream stream)
        {
            var fileTransferUtility = new TransferUtility(_client);

            var uploadRequest = new TransferUtilityUploadRequest
            {
                InputStream = stream,
                Key =Guid.NewGuid().ToString(),
                BucketName = _s3Options.BucketName,
                CannedACL = S3CannedACL.NoACL
            };

            fileTransferUtility.UploadAsync(uploadRequest).Wait();

            fileEntry.FileLocation = uploadRequest.Key;
        }

        public void Delete(Picture fileEntry)
        {
            _client.DeleteObjectAsync(_s3Options.BucketName, fileEntry.FileLocation).Wait();
        }

        public string GetCannedSignedURL(string fileName)
        {
            string url = "";
            using (var textReader = File.OpenText(_cloudFrontOptions.PrivateKeyPath))
            {
                url = AmazonCloudFrontUrlSigner.GetCannedSignedURL(
                    AmazonCloudFrontUrlSigner.Protocol.https,
                    _cloudFrontOptions.Domain,
                    textReader,
                    fileName,
                    _cloudFrontOptions.KeypairId,
                    DateTime.Now.AddSeconds(_cloudFrontOptions.ExpiredInSecond));
            }

            return url;
        }

        public byte[] Read(Picture fileEntry)
        {
            var request = new GetObjectRequest
            {
                BucketName = _s3Options.BucketName,
                Key = fileEntry.FileLocation,
            };

            using (var response = _client.GetObjectAsync(request).GetAwaiter().GetResult())
            using (var responseStream = response.ResponseStream)
            using (var reader = new MemoryStream())
            {
                responseStream.CopyTo(reader);
                return reader.ToArray();
            }
        }
    }
}
